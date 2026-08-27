import {
  isValidContactService,
  resolveContactServices,
  sectorContactMessage,
  type ContactServiceOption
} from "@/lib/contact-services";
import { resolveInquiryCategory, type InquiryCategoryId, isInquiryCategoryId } from "@/lib/contact-inquiry";

export type ContactUrlPrefill = {
  initialServices: ContactServiceOption[];
  initialCategory?: InquiryCategoryId;
  initialMessage: string;
};

function queryParam(value: string | null): string {
  if (!value) return "";
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
}

/** Reads contact-form prefill values from a query string on the client. */
export function readContactUrlPrefill(search = ""): ContactUrlPrefill {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(raw);
  const serviceParam = queryParam(params.get("service"));
  const sectorParam = queryParam(params.get("sector"));
  const extraParam = queryParam(params.get("services"));
  const extraServices = extraParam
    ? extraParam.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const initialServices = resolveContactServices(serviceParam, sectorParam, extraServices);
  const categoryParam = queryParam(params.get("category"));
  const initialCategory = isInquiryCategoryId(categoryParam)
    ? categoryParam
    : initialServices.length > 0
      ? resolveInquiryCategory(initialServices)
      : undefined;
  const messageParam = queryParam(params.get("message")).trim().slice(0, 1000);
  const initialMessage = messageParam
    ? messageParam
    : sectorParam
      ? sectorContactMessage(sectorParam)
      : !isValidContactService(serviceParam) && serviceParam
        ? sectorContactMessage(serviceParam)
        : "";

  return {
    initialServices: [...initialServices],
    initialCategory,
    initialMessage
  };
}
