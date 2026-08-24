export type InquiryCtaParams = {
  service_interest: string | undefined;
  inquiry_category: string | undefined;
};

const contactPathPattern = /^\/(?:cs\/|en\/|de\/)?kontakt\/?$/;

export function getInquiryCtaParams(href: string, currentUrl: string): InquiryCtaParams | null {
  try {
    const current = new URL(currentUrl);
    const target = new URL(href, current);
    if (
      target.origin !== current.origin ||
      !contactPathPattern.test(target.pathname) ||
      target.hash !== "#poptavkovy-formular"
    ) {
      return null;
    }

    return {
      service_interest: target.searchParams.get("service") || undefined,
      inquiry_category: target.searchParams.get("category") || undefined
    };
  } catch {
    return null;
  }
}
