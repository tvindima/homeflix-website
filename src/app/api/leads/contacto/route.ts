import { randomUUID } from "node:crypto";
import { appendRecord } from "@/lib/server/fs-db";
import { allowRequest } from "@/lib/server/rate-limit";
import { validateContactLead } from "@/lib/server/form-validators";
import { getClientIp, getUserAgent } from "@/lib/server/request";
import { errorJson, okJson } from "@/lib/server/response";
import { sendAutoReplyEmail, sendInternalLeadEmail } from "@/lib/server/email";

export async function POST(request: Request) {
  const ip = await getClientIp();
  const userAgent = await getUserAgent();

  if (!allowRequest(`lead:contacto:${ip}`, 10, 60_000)) {
    return errorJson(429, "Demasiados pedidos. Tente novamente em instantes.");
  }

  const formData = await request.formData();
  const parsed = validateContactLead(formData);

  if (!parsed.ok) {
    return errorJson(400, "Valide os dados e tente novamente.", parsed.errors);
  }

  if (parsed.data.honeypot) {
    return okJson({ message: "Recebido." });
  }

  const leadId = `CNT-${randomUUID()}`;
  const payload = {
    leadId,
    leadType: "contacto",
    status: "novo",
    createdAt: new Date().toISOString(),
    ip,
    userAgent,
    ...parsed.data,
    honeypot: undefined,
  };

  await appendRecord("leads_contacto", payload);
  await sendInternalLeadEmail({
    category: "contacto",
    leadId,
    sourcePage: parsed.data.sourcePage,
    payload,
  });
  await sendAutoReplyEmail({
    to: parsed.data.email,
    name: parsed.data.nome,
    category: "contacto",
  });

  return okJson({ message: "Recebemos o seu pedido. A equipa Homeflix ira responder com a maior brevidade." });
}
