"use client";

import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/client-tracking";
import { useModal } from "@/components/modals/modal-provider";

export function StickyMobileCta() {
  const pathname = usePathname();
  const { openModal } = useModal();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-300 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.15)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="btn-secondary w-full"
          onClick={() => {
            trackEvent({ event: "sticky_pedir_acesso", pathname, source: "sticky_mobile" });
            openModal("quickAccess");
          }}
        >
          Pedir acesso
        </button>
        <button
          type="button"
          className="btn-primary w-full"
          onClick={() => {
            trackEvent({ event: "sticky_apresentar_empreendimento", pathname, source: "sticky_mobile" });
            openModal("quickEmpreendimento");
          }}
        >
          Apresentar
        </button>
      </div>
    </div>
  );
}
