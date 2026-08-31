import { NextResponse } from "next/server";
import { getArticles } from "@/lib/articles";
import { locales } from "@/lib/i18n/locales";

// A build-time snapshot, not an API call or an ISR timer on visitor requests.
// Only already-public identifiers are exposed; never scheduled titles or drafts.
export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const articles = (await Promise.all(locales.map(async (locale) =>
    (await getArticles(locale)).map(({ slug, publishedAt }) => ({ locale, slug, publishedAt }))
  ))).flat().sort((a, b) => `${a.locale}/${a.slug}`.localeCompare(`${b.locale}/${b.slug}`));
  return NextResponse.json({
    version: 1,
    commit: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || null,
    builtAt: new Date().toISOString(),
    articles
  }, { headers: { "X-Robots-Tag": "noindex", "Cache-Control": "public, max-age=0, must-revalidate" } });
}
