export type FormStatus = "idle" | "loading" | "success" | "error";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "live.com",
  "aol.com",
]);

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string): boolean {
  const cleaned = value.replace(/[^\d+]/g, "");
  return cleaned.length >= 9 && cleaned.length <= 18;
}

export function isProfessionalEmail(value: string): boolean {
  const domain = value.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}

export function normalizeString(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

export function boolFromForm(value: FormDataEntryValue | null): boolean {
  return value === "on" || value === "true";
}

export function formatErrorList(errors: string[]): string {
  return errors.join(" ");
}
