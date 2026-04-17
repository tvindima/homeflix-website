import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ",
  description: "Perguntas frequentes sobre acesso e operacao da Homeflix.",
  path: "/faq",
});

const items = [
  {
    q: "A Homeflix e um portal de anuncios?",
    a: "Nao. A Homeflix e uma infraestrutura de partilha imobiliaria para operacao profissional validada.",
  },
  {
    q: "O acesso e publico?",
    a: "Nao. O acesso depende de candidatura, validacao e enquadramento profissional.",
  },
  {
    q: "Promotores podem apresentar empreendimento sem compromisso?",
    a: "Sim. O envio inicia avaliacao comercial e operacional, sem ativacao automatica.",
  },
  {
    q: "Que tipo de parceiro pode candidatar-se?",
    a: "Consultores ativos ligados a mediadoras crediveis e com atividade comprovada.",
  },
];

export default function FaqPage() {
  return (
    <section className="section-wrap">
      <h1 className="display-md">FAQ</h1>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
