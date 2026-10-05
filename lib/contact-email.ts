import type { CreateEmailOptions } from "resend";

import { CONTACT_NEED_LABELS, type ContactFormInput } from "@/lib/contact-contract";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

/** Build both mail formats from schema-validated input; HTML fields are escaped. */
export function buildContactEmail(
  data: ContactFormInput,
  addresses: { from: string; to: string },
): CreateEmailOptions {
  const needLabel = CONTACT_NEED_LABELS[data.need];
  const company = data.company ?? "Non renseignée";

  return {
    from: addresses.from,
    to: addresses.to,
    replyTo: data.email,
    subject: `Nouvelle demande portfolio — ${needLabel}`,
    text: [
      `Nom : ${data.name}`,
      `Entreprise : ${company}`,
      `E-mail : ${data.email}`,
      `Poste ou besoin : ${needLabel}`,
      "",
      "Message :",
      data.message,
    ].join("\n"),
    html: `
        <h1>Nouvelle demande depuis le portfolio</h1>
        <p><strong>Nom :</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Entreprise :</strong> ${escapeHtml(company)}</p>
        <p><strong>E-mail :</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Poste ou besoin :</strong> ${escapeHtml(needLabel)}</p>
        <h2>Message</h2>
        <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
      `,
  };
}
