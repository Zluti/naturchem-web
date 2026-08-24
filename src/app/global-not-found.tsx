import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import LocaleNotFound, { metadata as localeNotFoundMetadata } from "./[locale]/not-found";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const fontSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  weight: ["400", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  ...localeNotFoundMetadata,
  metadataBase: new URL(siteUrl)
};

/**
 * Unmatched URLs bypass the locale root layout. Keep their standalone HTML
 * correctly identified as Czech; the shared 404 metadata remains noindex.
 */
export default function GlobalNotFound() {
  return (
    <html lang="cs" className={fontSans.variable}>
      <body className={fontSans.className}>
        <LocaleNotFound />
      </body>
    </html>
  );
}
