import { appendRecord } from "@/lib/server/fs-db";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM || "Homeflix <no-reply@homeflix.im>";
const internalRecipient = process.env.LEADS_INTERNAL_EMAIL || "geral@homeflix.im";

async function sendViaResend(to: string | string[], subject: string, html: string): Promise<boolean> {
  if (!resendApiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to,
      subject,
      html,
    }),
  });

  return response.ok;
}

export async function sendInternalLeadEmail(args: {
  category: "acesso" | "empreendimento" | "contacto" | "demo";
  leadId: string;
  sourcePage: string;
  payload: Record<string, unknown>;
}): Promise<void> {
  const subject = `[Homeflix] Novo lead ${args.category.toUpperCase()} - ${args.leadId}`;
  const html = `
    <h2>Novo lead Homeflix</h2>
    <p><strong>Categoria:</strong> ${args.category}</p>
    <p><strong>Lead ID:</strong> ${args.leadId}</p>
    <p><strong>Origem:</strong> ${args.sourcePage}</p>
    <pre>${JSON.stringify(args.payload, null, 2)}</pre>
  `;

  const sent = await sendViaResend(internalRecipient, subject, html);
  if (!sent) {
    await appendRecord("email_queue", {
      type: "internal",
      createdAt: new Date().toISOString(),
      to: internalRecipient,
      subject,
      html,
    });
  }
}

export async function sendAutoReplyEmail(args: {
  to: string;
  name: string;
  category: "acesso" | "empreendimento" | "contacto" | "demo";
}): Promise<void> {
  const subject = "Recebemos o seu pedido na Homeflix";
  const html = `
    <p>Ola ${args.name || ""},</p>
    <p>Recebemos o seu pedido (${args.category}) e a equipa Homeflix ira analisar com a maior brevidade.</p>
    <p>Cumprimentos,<br/>Equipa Homeflix</p>
  `;

  const sent = await sendViaResend(args.to, subject, html);
  if (!sent) {
    await appendRecord("email_queue", {
      type: "auto_reply",
      createdAt: new Date().toISOString(),
      to: args.to,
      subject,
      html,
    });
  }
}
