"use server";

import { getSiteSettings } from "@/lib/sanity/fetch";
import { PATHWAY_TITLES } from "./pathways";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors, keyed by input name. */
  errors?: Partial<Record<"name" | "email" | "message" | "pathway", string>>;
  /** Echoed back so a failed submit does not wipe what was typed. */
  values?: { name: string; email: string; organisation: string; pathway: string; message: string };
};

// A plain, permissive check — the point is to catch typos, not to police
// what a valid address may look like.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    organisation: String(formData.get("organisation") ?? "").trim(),
    pathway: String(formData.get("pathway") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Honeypot: a hidden field only an automated submitter would fill in.
  // Report success so the bot has nothing to learn from the response.
  if (String(formData.get("company") ?? "")) {
    return { status: "success", message: "Thanks — your message has been sent." };
  }

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Please tell us your name.";
  if (!values.email) errors.email = "Please add an email address so we can reply.";
  else if (!EMAIL.test(values.email)) errors.email = "That email address looks incomplete.";
  if (!values.message) errors.message = "Please add a short message.";
  else if (values.message.length < 20)
    errors.message = "Please add a little more detail (at least 20 characters).";
  else if (values.message.length > 5000)
    errors.message = "Please keep the message under 5000 characters.";
  if (values.pathway && !PATHWAY_TITLES.includes(values.pathway))
    errors.pathway = "Please choose one of the listed options.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const settings = await getSiteSettings();
  const to = process.env.CONTACT_TO_EMAIL || settings.contactEmail;

  if (!apiKey || !from || !to) {
    console.error("Contact form is not configured (RESEND_API_KEY / CONTACT_FROM_EMAIL / recipient).");
    return {
      status: "error",
      message: "The form is not available right now. Please email us directly instead.",
      values,
    };
  }

  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.organisation ? `Organisation: ${values.organisation}` : null,
    values.pathway ? `Interested in: ${values.pathway}` : null,
    "",
    values.message,
  ].filter((line) => line !== null);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Replying in the mail client goes straight back to the sender.
        reply_to: values.email,
        subject: `FETLAB enquiry — ${values.pathway || "General"} — ${values.name}`,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the message:", response.status, await response.text());
      return {
        status: "error",
        message: "We couldn't send that just now. Please try again, or email us directly.",
        values,
      };
    }
  } catch (error) {
    console.error("Contact form send failed:", error);
    return {
      status: "error",
      message: "We couldn't send that just now. Please try again, or email us directly.",
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks — your message is on its way. We'll get back to you soon.",
  };
}
