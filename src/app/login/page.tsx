import type { Metadata } from "next";
import { RestrictedAccessCard } from "@/components/ui/restricted-access-card";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Login",
  description: "Area privada Homeflix com acesso restrito e validado.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <section className="section-wrap">
      <h1 className="display-md">Area privada Homeflix</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-300">
        O login da plataforma privada so e disponibilizado a contas aprovadas no processo de validacao.
      </p>
      <div className="mt-8">
        <RestrictedAccessCard />
      </div>
    </section>
  );
}
