/*
 * Dev Aastha — Corporate Gifting landing page configuration.
 *
 * Everything the marketing team needs to change lives in this one file.
 * No other file should need editing to go live.
 */
window.DA_CONFIG = {
  /* ------------------------------------------------------------------
   * Contact details
   * ------------------------------------------------------------------ */

  // Phone number for the header call button. This is the ONLY call CTA on
  // the page — calls cannot be tracked, so the body uses WhatsApp and the
  // form instead. Digits only, with country code.
  phone: '919999999999',

  // WhatsApp business number that the "Get in Touch" CTA opens.
  // Digits only, with country code, no "+" and no spaces.
  whatsapp: '919999999999',

  // Prefilled first message for WhatsApp. Keep it short — it doubles as the
  // signal the bot uses to route the conversation.
  whatsappMessage: 'Hi Dev Aastha, I am looking at Diwali corporate gifting and would like to know more.',

  /* ------------------------------------------------------------------
   * Enquiry form
   * ------------------------------------------------------------------ */

  // Where the enquiry form posts. Accepts any endpoint that takes a JSON or
  // form-encoded POST (Google Apps Script, Zapier catch hook, Shopify app
  // proxy, your own CRM endpoint).
  // Leave empty to run the page in demo mode: submissions are logged to the
  // console and the success state still shows, so the flow can be reviewed
  // before the endpoint exists.
  formEndpoint: '',

  // 'json' posts an application/json body. 'form' posts
  // application/x-www-form-urlencoded, which is what Google Apps Script and
  // most no-code catch hooks expect.
  formEncoding: 'form',

  /* ------------------------------------------------------------------
   * Catalog
   * ------------------------------------------------------------------ */

  // The catalog is gated: "Request Catalog" opens the form first, and this
  // link is only opened after a successful submission.
  catalogUrl: 'assets/catalog/dev-aastha-corporate-gifting-catalog.pdf',

  /* ------------------------------------------------------------------
   * Analytics (optional)
   * ------------------------------------------------------------------ */

  // Set to false to silence the dataLayer / gtag events the page fires for
  // form opens, submissions, WhatsApp clicks and catalog downloads.
  trackEvents: true
};
