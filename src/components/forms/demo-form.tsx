"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { FormFeedback } from "@/components/forms/form-feedback";
import { InputField, TextAreaField } from "@/components/ui/input-field";
import { FormStatus } from "@/lib/forms";
import { trackEvent } from "@/lib/client-tracking";

type DemoFormProps = {
  onSuccess?: () => void;
};

type ApiResponse = {
  ok: boolean;
  errors?: string[];
  message?: string;
};

export function DemoForm({ onSuccess }: DemoFormProps) {
  const pathname = usePathname();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setErrors([]);

    trackEvent({ event: "form_submit_attempt", pathname, source: "demo" });

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/leads/demo", {
      method: "POST",
      body: formData,
    });

    const result = (await response.json()) as ApiResponse;

    if (!response.ok || !result.ok) {
      setStatus("error");
      setMessage(result.message || "Nao foi possivel submeter o pedido de demonstracao.");
      setErrors(result.errors || []);
      trackEvent({ event: "form_submit_error", pathname, source: "demo" });
      return;
    }

    setStatus("success");
    setMessage(result.message || "Pedido de demonstracao recebido. Entraremos em contacto.");
    trackEvent({ event: "form_submit_success", pathname, source: "demo" });
    if (onSuccess) onSuccess();
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input type="hidden" name="sourcePage" value={pathname} />
      <input type="text" name="website" className="hp-field" autoComplete="off" tabIndex={-1} />
      <div className="grid gap-4 md:grid-cols-2">
        <InputField name="nome" label="Nome" required />
        <InputField name="empresa" label="Empresa" required />
        <InputField name="email" label="Email" required type="email" />
        <InputField name="telefone" label="Telefone" required />
        <InputField name="tipoInteresse" label="Tipo de interesse" required placeholder="Promotor, parceiro, institucional" />
      </div>
      <TextAreaField name="mensagem" label="Mensagem" required />

      <button className="btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "A submeter..." : "Marcar demonstracao"}
      </button>

      <FormFeedback status={status} message={message} errors={errors} />
    </form>
  );
}
