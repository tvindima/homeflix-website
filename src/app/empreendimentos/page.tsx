import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Layers3, MapPin } from "lucide-react";
import { empreendimentos } from "@/content/empreendimentos";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Empreendimentos em Sistema",
  description: "Preview dos empreendimentos ativos no sistema Homeflix com acesso a detalhe e pedido de contacto.",
  path: "/empreendimentos",
});

const totalFracoes = empreendimentos.reduce((sum, item) => sum + item.totalFracoes, 0);
const fracoesDisponiveis = empreendimentos.reduce((sum, item) => sum + item.fracoesDisponiveis, 0);
const fracoesReservadas = empreendimentos.reduce((sum, item) => sum + item.fracoesReservadas, 0);

export default function EmpreendimentosPage() {
  return (
    <>
      <section className="hero-bg">
        <div className="container-wrap py-20">
          <p className="eyebrow">Preview comercial</p>
          <h1 className="display-lg max-w-4xl text-balance">Empreendimentos em sistema para consulta e interesse.</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            Explore os projetos ativos, entre no detalhe de cada empreendimento e envie pedido de contacto para receber mais
            informacao diretamente.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="chip-dark">
              <strong className="block text-2xl text-cyan-300">{empreendimentos.length}</strong>
              Empreendimentos em operacao
            </div>
            <div className="chip-dark">
              <strong className="block text-2xl text-cyan-300">{totalFracoes}</strong>
              Fracoes em sistema
            </div>
            <div className="chip-dark">
              <strong className="block text-2xl text-cyan-300">{fracoesDisponiveis}</strong>
              Fracoes disponiveis ({fracoesReservadas} reservadas)
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {empreendimentos.map((project) => (
            <article key={project.slug} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
              <div className="relative aspect-[16/10]">
                <Image src={project.capa} alt={project.nome} fill sizes="(max-width: 1280px) 100vw, 32vw" className="object-cover" />
                <span className="empreendimento-watermark" aria-hidden />
                <span className="absolute left-3 top-3 z-20 rounded-full border border-cyan-300/40 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {project.regiao}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div>
                  <h2 className="text-2xl font-semibold leading-tight text-slate-100">{project.nome}</h2>
                  <p className="mt-1 inline-flex items-center gap-2 text-sm text-slate-300">
                    <MapPin size={15} /> {project.localizacao}
                  </p>
                </div>

                <p className="text-sm text-slate-300">{project.resumo}</p>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-2">
                    <span className="block text-slate-400">Total</span>
                    <strong className="text-base text-slate-100">{project.totalFracoes}</strong>
                  </div>
                  <div className="rounded-lg border border-emerald-800/60 bg-emerald-950/30 p-2">
                    <span className="block text-emerald-300/90">Disponiveis</span>
                    <strong className="text-base text-emerald-200">{project.fracoesDisponiveis}</strong>
                  </div>
                  <div className="rounded-lg border border-amber-800/60 bg-amber-950/30 p-2">
                    <span className="block text-amber-300/90">Reservadas</span>
                    <strong className="text-base text-amber-200">{project.fracoesReservadas}</strong>
                  </div>
                </div>

                <div className="space-y-1 rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-sm">
                  <p className="inline-flex items-center gap-2 text-slate-300">
                    <Layers3 size={15} /> {project.previsaoComercial}
                  </p>
                  <p className="inline-flex items-center gap-2 text-slate-400">
                    <Building2 size={15} /> Atualizado em {project.atualizadoEm}
                  </p>
                </div>

                <Link href={`/empreendimentos/${project.slug}`} className="btn-primary inline-flex w-full items-center justify-center gap-2">
                  Ver detalhe e saber mais <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
