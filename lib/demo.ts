export const CONTACT_EVENT = "smartmerd:select-topic";

/** Topic indexes match `contact.topics` in lib/i18n.tsx */
export const TOPIC = { pilot: 0, partner: 1, general: 2 } as const;

/** Scroll to the contact form and preselect the enquiry type. */
export function requestContact(topicIndex: number = TOPIC.pilot) {
  const el = document.getElementById("contact");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  window.dispatchEvent(new CustomEvent(CONTACT_EVENT, { detail: topicIndex }));
}
