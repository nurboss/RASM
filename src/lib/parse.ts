/** Split comma- or newline-separated values into trimmed non-empty strings. */
export function parseList(input: string): string[] {
  return input
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Parse `images` from FormData: JSON array of URLs, or legacy comma/newline list. */
export function parseImagesField(formData: FormData): string[] {
  const raw = formData.get("images");
  if (raw == null) return [];
  const s = String(raw).trim();
  if (!s) return [];
  if (s.startsWith("[")) {
    try {
      const parsed = JSON.parse(s) as unknown;
      if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) {
        return parsed;
      }
    } catch {
      /* fall through */
    }
  }
  return parseList(s);
}
