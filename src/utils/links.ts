/** A link counts as "real" only if it is a proper URL – "", "#" and undefined are placeholders. */
export function isRealUrl(url?: string): url is string {
  return !!url && url.trim() !== "" && url.trim() !== "#";
}

export function isExternal(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
