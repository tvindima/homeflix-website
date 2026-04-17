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
const localidades = [...new Set(empreendimentos.map((item) => item.localizacao))].sort((a, b) => a.localeCompare(b, "pt-PT"));

type EmpreendimentosPageProps = {
  searchParams: Promise<{ localidade?: string | string[] }>;
};

export default async function EmpreendimentosPage({ searchParams }: EmpreendimentosPageProps) {
  const query = await searchParams;
  const localidadeQuery = Array.isArray(query.localidade) ? query.localidade[0] : query.localidade;
  const localidadeSelecionada = localidadeQuery && localidades.includes(localidadeQuery) ? localidadeQuery : "";
  const empreendimentosFiltrados = localidadeSelecionada
    ? empreendimentos.filter((item) => item.localizacao === localidadeSelecionada)
    : empreendimentos;

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
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/75 p-4">
          <form id="filtro-localidade" method="GET" className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="w-full max-w-sm space-y-2">
              <label htmlFor="localidade" className="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">
                Filtrar por localidade
              </label>
              <select
                id="localidade"
                name="localidade"
                defaultValue={localidadeSelecionada}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400/50 transition focus:ring-2"
              >
                <option value="">Todas as localidades</option>
                {localidades.map((localidade) => (
                  <option key={localidade} value={localidade}>
                    {localidade}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button type="submit" className="btn-primary inline-flex items-center justify-center px-5 py-2">
                Aplicar filtro
              </button>
              {localidadeSelecionada ? (
                <Link href="/empreendimentos" className="btn-secondary inline-flex items-center justify-center px-5 py-2">
                  Limpar filtro
                </Link>
              ) : null}
            </div>
          </form>

          <p className="mt-3 text-sm text-slate-300">
            A mostrar <strong className="text-cyan-300">{empreendimentosFiltrados.length}</strong> de{" "}
            <strong className="text-cyan-300">{empreendimentos.length}</strong> empreendimentos.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {empreendimentosFiltrados.map((project) => (
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

        {empreendimentosFiltrados.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center text-slate-300">
            Nao existem empreendimentos para a localidade selecionada.
          </div>
        ) : null}
      </section>
    </>
  );
}
