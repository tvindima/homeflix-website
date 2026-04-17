"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { FormFeedback } from "@/components/forms/form-feedback";
import { InputField, TextAreaField } from "@/components/ui/input-field";
import { FormStatus } from "@/lib/forms";
import { trackEvent } from "@/lib/client-tracking";

type ApiResponse = {
  ok: boolean;
  errors?: string[];
  message?: string;
};

export function ContactForm() {
  const pathname = usePathname();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setErrors([]);

    trackEvent({ event: "form_submit_attempt", pathname, source: "contacto" });

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/leads/contacto", {
      method: "POST",
      body: formData,
    });

    const result = (await response.json()) as ApiResponse;

    if (!response.ok || !result.ok) {
      setStatus("error");
      setMessage(result.message || "Nao foi possivel enviar o contacto neste momento.");
      setErrors(result.errors || []);
      trackEvent({ event: "form_submit_error", pathname, source: "contacto" });
      return;
    }

    setStatus("success");
    setMessage(result.message || "Recebemos o seu contacto. Responderemos com a maior brevidade.");
    trackEvent({ event: "form_submit_success", pathname, source: "contacto" });
    (event.target as HTMLFormElement).reset();
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input type="hidden" name="sourcePage" value={pathname} />
      <input type="text" name="website" className="hp-field" autoComplete="off" tabIndex={-1} />

      <div className="grid gap-4 md:grid-cols-2">
        <InputField name="nome" label="Nome" required />
        <InputField name="email" label="Email" type="email" required />
        <InputField name="telefone" label="Telefone" required />
        <InputField name="assunto" label="Assunto" required />
      </div>
      <TextAreaField name="mensagem" label="Mensagem" required />

      <button className="btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "A enviar..." : "Enviar contacto"}
      </button>

      <FormFeedback status={status} message={message} errors={errors} />
    </form>
  );
}
