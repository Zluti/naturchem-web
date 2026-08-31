import { ALLOWED_ATTACHMENT_EXT, ALLOWED_ATTACHMENT_MIME, FORM_LIMITS } from "@/lib/form-validation-limits";

export type AttachmentError = "tooManyAttachments" | "invalidAttachment" | "attachmentsTooLarge";

/** Shared client/server rules: reject unusable uploads before a mobile visitor sends them. */
export function getAttachmentError(files: readonly Pick<File, "name" | "size" | "type">[]): AttachmentError | null {
  if (files.length > FORM_LIMITS.maxAttachments) return "tooManyAttachments";
  if (files.some((file) => file.size > 0 && (
    !ALLOWED_ATTACHMENT_EXT.test(file.name) ||
    (file.type !== "" && file.type !== "application/octet-stream" && !ALLOWED_ATTACHMENT_MIME.has(file.type))
  ))) return "invalidAttachment";
  if (files.reduce((total, file) => total + file.size, 0) > FORM_LIMITS.maxAttachmentsTotalBytes) {
    return "attachmentsTooLarge";
  }
  return null;
}
