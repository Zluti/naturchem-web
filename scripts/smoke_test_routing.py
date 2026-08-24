#!/usr/bin/env python3
"""Verify locale routing, canonical metadata, assets, 404s and contact API."""

from __future__ import annotations

import re
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000").rstrip("/")


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001
        return None


OPENER = urllib.request.build_opener(NoRedirect)


@dataclass
class Response:
    status: int
    headers: object
    body: bytes


def fetch(
    path: str,
    *,
    method: str = "GET",
    data: bytes | None = None,
    headers: dict[str, str] | None = None,
) -> Response:
    request = urllib.request.Request(
        f"{BASE}{path}",
        data=data,
        method=method,
        headers={"User-Agent": "naturchem-routing-smoke", **(headers or {})},
    )
    try:
        with OPENER.open(request, timeout=30) as response:
            return Response(response.status, response.headers, response.read())
    except urllib.error.HTTPError as error:
        return Response(error.code, error.headers, error.read())


failures: list[str] = []


def check(label: str, condition: bool, detail: str) -> None:
    if condition:
        print(f"PASS {label}")
    else:
        failures.append(f"{label}: {detail}")
        print(f"FAIL {label}: {detail}")


def location_matches(response: Response, expected: str) -> bool:
    location = response.headers.get("Location", "")
    return location == expected or location == f"{BASE}{expected}"


def html(path: str) -> tuple[Response, str]:
    response = fetch(path)
    return response, response.body.decode("utf-8", errors="replace")


def check_html(path: str, lang: str, canonical: str) -> None:
    response, body = html(path)
    check(f"{path} status", response.status == 200, f"got {response.status}")
    check(
        f"{path} lang",
        re.search(rf'<html[^>]+lang=["\']{re.escape(lang)}["\']', body, re.I) is not None,
        f"missing html lang={lang}",
    )
    check(
        f"{path} canonical",
        re.search(
            rf'rel=["\']canonical["\'][^>]+href=["\']{re.escape(canonical)}["\']',
            body,
            re.I,
        )
        is not None,
        f"missing canonical {canonical}",
    )
    for hreflang in ("cs", "en", "de", "x-default"):
        check(
            f"{path} hreflang {hreflang}",
            re.search(rf'hreflang=["\']{hreflang}["\']', body, re.I) is not None,
            f"missing hreflang {hreflang}",
        )


check_html("/", "cs", "https://www.naturchem.cz/")
check_html("/sluzby/", "cs", "https://www.naturchem.cz/sluzby/")
check_html("/en/sluzby/", "en", "https://www.naturchem.cz/en/sluzby/")
check_html("/de/sluzby/", "de", "https://www.naturchem.cz/de/sluzby/")

redirect_cases = (
    ("/cs/", "/"),
    ("/cs/sluzby/", "/sluzby/"),
    ("/cs/kontakt/?service=mereni-emisi", "/kontakt/?service=mereni-emisi"),
    ("/mereni-emisi/", "/sluzby/mereni-emisi/"),
    ("/redakce/", "/poradna/"),
)
for source, destination in redirect_cases:
    response = fetch(source)
    check(f"redirect {source}", response.status == 308, f"got {response.status}")
    check(
        f"redirect target {source}",
        location_matches(response, destination),
        f"got {response.headers.get('Location')!r}, expected {destination!r}",
    )

for path, content_type in (
    ("/icon.png", "image/png"),
    ("/search/poradna-cs.json", "application/json"),
    ("/robots.txt", "text/plain"),
    ("/sitemap.xml", "application/xml"),
    ("/admin/index.html", "text/html"),
):
    response = fetch(path)
    check(f"asset {path}", response.status == 200, f"got {response.status}")
    check(
        f"asset type {path}",
        content_type in response.headers.get("Content-Type", ""),
        f"got {response.headers.get('Content-Type')!r}",
    )

contact_response, contact_html = html("/kontakt/?service=mereni-emisi")
check("contact status", contact_response.status == 200, f"got {contact_response.status}")
check(
    "contact form anchor",
    'id="poptavkovy-formular"' in contact_html,
    "missing #poptavkovy-formular",
)

not_found_response, not_found_html = html("/neexistujici-url/")
check("404 status", not_found_response.status == 404, f"got {not_found_response.status}")
check(
    "404 noindex",
    re.search(r'name=["\']robots["\'][^>]+content=["\']noindex["\']', not_found_html, re.I)
    is not None,
    "missing robots noindex",
)
check(
    "404 Czech language",
    re.search(r'<html[^>]+lang=["\']cs["\']', not_found_html, re.I) is not None,
    "missing html lang=cs",
)

api_get = fetch("/api/contact/")
check("contact API GET", api_get.status == 405, f"got {api_get.status}")

boundary = "naturchem-smoke-boundary"
multipart = (
    f"--{boundary}\r\n"
    'Content-Disposition: form-data; name="name"\r\n\r\n'
    f"\r\n--{boundary}--\r\n"
).encode()
api_post = fetch(
    "/api/contact/",
    method="POST",
    data=multipart,
    headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
)
check("contact API validation", api_post.status == 400, f"got {api_post.status}")

print(f"Done. Routing failures: {len(failures)}")
for failure in failures:
    print(f"  {failure}")

raise SystemExit(1 if failures else 0)
