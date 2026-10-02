export function scrollToSection(id: string, reduced: boolean) {
  const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
  if (id === "home") {
    window.scrollTo({ top: 0, behavior });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  }
  try {
    history.replaceState(history.state, "", id === "home" ? "/" : `/#${id}`);
  } catch {
    /* ignore */
  }
}
