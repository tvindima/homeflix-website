import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Politica de Privacidade",
  description: "Politica de tratamento de dados pessoais do website Homeflix.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <section className="section-wrap legal-copy">
      <h1>Politica de Privacidade</h1>
      <p>
        A Homeflix trata dados pessoais no contexto de contacto institucional, candidatura de parceiros e apresentacao de
        empreendimentos, em conformidade com o enquadramento legal aplicavel.
      </p>
      <h2>1. Dados recolhidos</h2>
      <p>
        Nome, email, telefone, informacao profissional e dados submetidos voluntariamente em formularios e anexos de
        comprovativos.
      </p>
      <h2>2. Finalidades</h2>
      <p>
        Validacao comercial, resposta a pedidos, analise de elegibilidade e melhoria operacional da experiencia comercial do
        website.
      </p>
      <h2>3. Conservacao</h2>
      <p>
        Os dados sao conservados pelo periodo necessario ao tratamento do pedido e ao cumprimento de obrigacoes legais e
        operacionais.
      </p>
      <h2>4. Direitos do titular</h2>
      <p>
        O titular pode solicitar acesso, retificacao, apagamento ou limitacao do tratamento dos seus dados atraves dos contactos
        institucionais.
      </p>
      <h2>5. Contacto de privacidade</h2>
      <p>Para assuntos de privacidade: privacidade@homeflix.im</p>
    </section>
  );
}
