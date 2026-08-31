"""Generate responsive AVIF assets used by the homepage LCP picture."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = (
    ("homepage-mereni-640.webp", "homepage-mereni-640.avif"),
    ("homepage-mereni.webp", "homepage-mereni.avif"),
)


def main() -> None:
    hero_dir = ROOT / "public" / "hero"
    for source_name, target_name in ASSETS:
        source = hero_dir / source_name
        target = hero_dir / target_name
        with Image.open(source) as image:
            image.convert("RGB").save(target, "AVIF", quality=50, speed=6)

        print(f"Wrote {target.relative_to(ROOT)} ({target.stat().st_size / 1024:.1f} KiB)")


if __name__ == "__main__":
    main()
