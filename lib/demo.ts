export const DEMO_EVENT = "smartmerd:select-demo";

export function requestDemo() {
  const el = document.getElementById("kontakt");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  window.dispatchEvent(new CustomEvent(DEMO_EVENT));
}
