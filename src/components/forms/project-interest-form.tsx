"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/client-tracking";
import { FormFeedback } from "@/components/forms/form-feedback";
import { InputField, TextAreaField } from "@/components/ui/input-field";
import { FormStatus } from "@/lib/forms";

type ProjectInterestFormProps = {
  projectName: string;
};

type ApiResponse = {
  ok: boolean;
  errors?: string[];
  message?: string;
};

export function ProjectInterestForm({ projectName }: ProjectInterestFormProps) {
  const pathname = usePathname();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setErrors([]);

    trackEvent({ event: "form_submit_attempt", pathname, source: "interesse_empreendimento" });

    const original = new FormData(event.currentTarget);

    const nome = String(original.get("nome") || "").trim();
    const email = String(original.get("email") || "").trim();
    const telefone = String(original.get("telefone") || "").trim();
    const empresa = String(original.get("empresa") || "").trim();
    const cargo = String(original.get("cargo") || "").trim();
    const mensagemLivre = String(original.get("mensagemInteresse") || "").trim();
    const honeypot = String(original.get("website") || "");

    const payload = new FormData();
    payload.set("sourcePage", pathname);
    payload.set("website", honeypot);
    payload.set("nome", nome);
    payload.set("email", email);
    payload.set("telefone", telefone);
    payload.set("assunto", `Interesse no empreendimento ${projectName}`);

    const composedMessage = [
      `Empreendimento de interesse: ${projectName}`,
      empresa ? `Empresa: ${empresa}` : "",
      cargo ? `Cargo: ${cargo}` : "",
      "",
      "Mensagem do potencial cliente:",
      mensagemLivre || "Sem mensagem adicional.",
    ]
      .filter(Boolean)
      .join("\n");

    payload.set("mensagem", composedMessage);

    const response = await fetch("/api/leads/contacto", {
      method: "POST",
      body: payload,
    });

    const result = (await response.json()) as ApiResponse;

    if (!response.ok || !result.ok) {
      setStatus("error");
      setMessage(result.message || "Nao foi possivel enviar o pedido neste momento.");
      setErrors(result.errors || []);
      trackEvent({ event: "form_submit_error", pathname, source: "interesse_empreendimento" });
      return;
    }

    setStatus("success");
    setMessage(result.message || "Recebemos o seu pedido. Entraremos em contacto em breve.");
    trackEvent({ event: "form_submit_success", pathname, source: "interesse_empreendimento" });
    (event.target as HTMLFormElement).reset();
  }

  return (
    <form className="lead-form panel panel-dark" onSubmit={onSubmit}>
      <input type="text" name="website" className="hp-field" autoComplete="off" tabIndex={-1} />

      <div className="grid gap-4">
        <InputField name="nome" label="Nome completo" required />
        <InputField name="telefone" label="Telefone" required />
        <InputField name="email" label="Email" type="email" required />
        <InputField name="empresa" label="Empresa" />
        <InputField name="cargo" label="Funcao / cargo" />
        <TextAreaField name="mensagemInteresse" label="O que pretende saber" required />
      </div>

      <button type="submit" className="btn-primary mt-2" disabled={status === "loading"}>
        {status === "loading" ? "A enviar..." : "Saber mais deste empreendimento"}
      </button>

      <FormFeedback status={status} message={message} errors={errors} />
    </form>
  );
}
