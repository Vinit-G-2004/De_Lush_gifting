// Campaign configuration for the De LUSH corporate gifting landing page.
// Replace these placeholders with the live values.

// Campaign configuration for the De LUSH corporate gifting landing page.

/**
 * Google Apps Script Web App URL.
 * Receives corporate enquiry submissions and saves them to Google Sheets.
 */
export const ENQUIRY_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwr-tMmsq3oh75pluUDirhi2_B9buulkt_5RomMOEVUqBbWZHAoDo0DDVLMR3n5RCIPqw/exec";
/** WhatsApp number in international format, digits only, e.g. "919876543210". */
export const WHATSAPP_NUMBER = "919999999999";

export const WHATSAPP_MESSAGE =
  "Hi, I'm interested in De LUSH corporate gifting.";

export const whatsappLink = () =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
