"use client";

import { useModal } from "@/components/modals/modal-provider";

export function RestrictedAccessCard() {
  const { openModal } = useModal();

  return (
    <div className="panel panel-dark max-w-2xl">
      <h2 className="text-2xl font-semibold text-slate-100">Acesso reservado a profissionais validados</h2>
      <p className="mt-3 text-slate-300">
        A camada privada da Homeflix nao e publica. O acesso e concedido apenas apos validacao comercial e operacional.
      </p>
      <button type="button" className="btn-primary mt-6" onClick={() => openModal("restricted")}>
        Ver requisitos de acesso
      </button>
    </div>
  );
}
