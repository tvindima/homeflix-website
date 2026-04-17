"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { ModalHost } from "@/components/modals/modal-host";

export type ModalType =
  | "quickAccess"
  | "quickEmpreendimento"
  | "demo"
  | "restricted"
  | "submitted";

type ModalContextType = {
  activeModal: ModalType | null;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const value = useMemo(
    () => ({
      activeModal,
      openModal: (modal: ModalType) => setActiveModal(modal),
      closeModal: () => setActiveModal(null),
    }),
    [activeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalHost />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }
  return context;
}
