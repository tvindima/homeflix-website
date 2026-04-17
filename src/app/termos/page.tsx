import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Termos e Condicoes",
  description: "Termos de utilizacao do website institucional Homeflix.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <section className="section-wrap legal-copy">
      <h1>Termos e Condicoes</h1>
      <p>
        Este website tem natureza institucional e comercial. O acesso a conteudos e formularios implica aceitacao das regras de
        utilizacao aqui descritas.
      </p>
      <h2>1. Objeto</h2>
      <p>
        A Homeflix disponibiliza informacao sobre a sua infraestrutura de partilha imobiliaria e mecanismos de candidatura para
        promotores, construtores e parceiros imobiliarios.
      </p>
      <h2>2. Submissoes</h2>
      <p>
        O utilizador compromete-se a submeter informacao verdadeira, atualizada e legalmente valida. A Homeflix pode solicitar
        comprovativos adicionais para validacao.
      </p>
      <h2>3. Elegibilidade</h2>
      <p>
        O envio de candidatura nao confere acesso automatico a plataforma privada. O acesso depende de analise interna e
        validacao de enquadramento profissional.
      </p>
      <h2>4. Propriedade intelectual</h2>
      <p>
        Conteudos, estrutura e identidade da marca Homeflix sao protegidos por direitos aplicaveis e nao podem ser reproduzidos
        sem autorizacao.
      </p>
      <h2>5. Limitacao de responsabilidade</h2>
      <p>
        A Homeflix nao garante disponibilidade ininterrupta do website e pode atualizar conteudos, fluxos e requisitos sem aviso
        previo.
      </p>
    </section>
  );
}
