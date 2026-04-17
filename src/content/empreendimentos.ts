import mediaManifest from "./empreendimentos-media.json";

export type Empreendimento = {
  slug: string;
  nome: string;
  localizacao: string;
  regiao: string;
  totalFracoes: number;
  fracoesDisponiveis: number;
  fracoesReservadas: number;
  previsaoComercial: string;
  atualizadoEm: string;
  resumo: string;
  destaques: string[];
  capa: string;
  galeria: string[];
};

type EmpreendimentoMedia = {
  cover: string | null;
  gallery: string[];
};

const mediaBySlug = mediaManifest as Record<string, EmpreendimentoMedia>;

function resolveCover(slug: string): string {
  return mediaBySlug[slug]?.cover || "/homeflix-hero-bg.png";
}

function resolveGallery(slug: string): string[] {
  const gallery = mediaBySlug[slug]?.gallery || [];
  return gallery.length > 0 ? gallery : [resolveCover(slug)];
}

export const empreendimentos: Empreendimento[] = [
  {
    slug: "golden-wolf",
    nome: "GOLDEN WOLF",
    localizacao: "Leiria",
    regiao: "LEIRIA",
    totalFracoes: 116,
    fracoesDisponiveis: 39,
    fracoesReservadas: 77,
    previsaoComercial: "Operacao ativa em sistema",
    atualizadoEm: "17/04/2026",
    resumo: "Empreendimento com elevada tracao comercial e reserva ativa de fracoes em rede.",
    destaques: ["Distribuicao em rede validada", "Documentacao centralizada", "Rastreabilidade comercial"],
    capa: resolveCover("golden-wolf"),
    galeria: resolveGallery("golden-wolf"),
  },
  {
    slug: "bela-vista",
    nome: "BELA VISTA",
    localizacao: "Fatima",
    regiao: "OUREM/FATIMA",
    totalFracoes: 79,
    fracoesDisponiveis: 40,
    fracoesReservadas: 39,
    previsaoComercial: "Previsao: 4o trimestre de 2027",
    atualizadoEm: "28/01/2026",
    resumo: "Projeto residencial com equilibrio entre disponibilidade e reserva em fase ativa de distribuicao.",
    destaques: ["Visibilidade em extranet", "Conteudos por fracao", "Fluxo comercial auditavel"],
    capa: resolveCover("bela-vista"),
    galeria: resolveGallery("bela-vista"),
  },
  {
    slug: "auren-sud",
    nome: "AUREN SUD",
    localizacao: "Ourem",
    regiao: "OUREM/FATIMA",
    totalFracoes: 72,
    fracoesDisponiveis: 64,
    fracoesReservadas: 8,
    previsaoComercial: "Previsao em atualizacao",
    atualizadoEm: "17/04/2026",
    resumo: "Empreendimento com forte stock disponivel para aceleracao comercial com parceiros.",
    destaques: ["Inventario amplo", "Detalhe de unidade", "Partilha estruturada"],
    capa: resolveCover("auren-sud"),
    galeria: resolveGallery("auren-sud"),
  },
  {
    slug: "villa-salgueiro",
    nome: "VILLA SALGUEIRO",
    localizacao: "Montijo",
    regiao: "MONTIJO",
    totalFracoes: 60,
    fracoesDisponiveis: 57,
    fracoesReservadas: 3,
    previsaoComercial: "Previsao: 1o trimestre de 2029",
    atualizadoEm: "17/03/2026",
    resumo: "Projeto com grande margem de disponibilidade para novos parceiros e equipas comerciais.",
    destaques: ["Galeria rica de media", "Tabela de fracoes por bloco", "Comercializacao em tempo real"],
    capa: resolveCover("villa-salgueiro"),
    galeria: resolveGallery("villa-salgueiro"),
  },
  {
    slug: "solar-das-oliveiras",
    nome: "SOLAR DAS OLIVEIRAS",
    localizacao: "Santarem",
    regiao: "SANTAREM",
    totalFracoes: 36,
    fracoesDisponiveis: 32,
    fracoesReservadas: 4,
    previsaoComercial: "Previsao em atualizacao",
    atualizadoEm: "17/04/2026",
    resumo: "Ativo residencial com operacao preparada para ampliacao de cobertura comercial.",
    destaques: ["Pipeline de unidade", "Processo validado", "Acesso profissional"],
    capa: resolveCover("solar-das-oliveiras"),
    galeria: resolveGallery("solar-das-oliveiras"),
  },
  {
    slug: "villa-galega",
    nome: "VILLA GALEGA",
    localizacao: "Montijo",
    regiao: "MONTIJO",
    totalFracoes: 32,
    fracoesDisponiveis: 32,
    fracoesReservadas: 0,
    previsaoComercial: "Previsao: 1o trimestre de 2027",
    atualizadoEm: "16/03/2026",
    resumo: "Empreendimento com 100% de fracoes disponiveis para distribuicao comercial imediata.",
    destaques: ["Stock integralmente disponivel", "Entrada rapida de parceiros", "Ativacao simples em rede"],
    capa: resolveCover("villa-galega"),
    galeria: resolveGallery("villa-galega"),
  },
  {
    slug: "nazareia-residences",
    nome: "NAZAREIA RESIDENCES",
    localizacao: "Nazare",
    regiao: "NAZARE",
    totalFracoes: 28,
    fracoesDisponiveis: 22,
    fracoesReservadas: 6,
    previsaoComercial: "Previsao: sem informacao",
    atualizadoEm: "28/01/2026",
    resumo: "Projeto com vista de fracoes, galeria e documentos com operacao comercial totalmente digital.",
    destaques: ["Gestao documental ativa", "Fracoes por estado", "Fluxo de consulta estruturado"],
    capa: resolveCover("nazareia-residences"),
    galeria: resolveGallery("nazareia-residences"),
  },
  {
    slug: "alto-da-colina-1a",
    nome: "ALTO DA COLINA 1A",
    localizacao: "Leiria",
    regiao: "LEIRIA",
    totalFracoes: 20,
    fracoesDisponiveis: 4,
    fracoesReservadas: 16,
    previsaoComercial: "Previsao: 3o trimestre de 2026",
    atualizadoEm: "16/03/2026",
    resumo: "Empreendimento com alta taxa de reserva e disponibilidade limitada para novas oportunidades.",
    destaques: ["Elevada procura", "Inventario controlado", "Partilha com rastreabilidade"],
    capa: resolveCover("alto-da-colina-1a"),
    galeria: resolveGallery("alto-da-colina-1a"),
  },
  {
    slug: "alto-da-colina-3a",
    nome: "ALTO DA COLINA 3A",
    localizacao: "Leiria",
    regiao: "LEIRIA",
    totalFracoes: 20,
    fracoesDisponiveis: 12,
    fracoesReservadas: 8,
    previsaoComercial: "Previsao: 3o trimestre de 2027",
    atualizadoEm: "16/03/2026",
    resumo: "Ativo com mix de disponibilidade e reserva, pronto para distribuicao comercial ativa.",
    destaques: ["Grelha de fracoes completa", "Documentos por unidade", "Operacao em rede"],
    capa: resolveCover("alto-da-colina-3a"),
    galeria: resolveGallery("alto-da-colina-3a"),
  },
  {
    slug: "vista-mocho",
    nome: "VISTA MOCHO",
    localizacao: "Leiria",
    regiao: "LEIRIA",
    totalFracoes: 18,
    fracoesDisponiveis: 13,
    fracoesReservadas: 5,
    previsaoComercial: "Previsao em atualizacao",
    atualizadoEm: "17/04/2026",
    resumo: "Projeto com boa disponibilidade para campanhas de captacao e fecho rapido.",
    destaques: ["Disponibilidade relevante", "Acesso imediato", "Modelo de partilha claro"],
    capa: resolveCover("vista-mocho"),
    galeria: resolveGallery("vista-mocho"),
  },
  {
    slug: "edificio-marginal",
    nome: "EDIFICIO MARGINAL",
    localizacao: "Nazare",
    regiao: "NAZARE",
    totalFracoes: 11,
    fracoesDisponiveis: 3,
    fracoesReservadas: 8,
    previsaoComercial: "Previsao: 2o trimestre de 2028",
    atualizadoEm: "25/03/2026",
    resumo: "Empreendimento com disponibilidade reduzida e forte nivel de reserva em curso.",
    destaques: ["Baixo stock disponivel", "Gestao de oportunidade", "Pipeline protegido"],
    capa: resolveCover("edificio-marginal"),
    galeria: resolveGallery("edificio-marginal"),
  },
  {
    slug: "azure",
    nome: "AZURE",
    localizacao: "Leiria",
    regiao: "LEIRIA",
    totalFracoes: 9,
    fracoesDisponiveis: 1,
    fracoesReservadas: 8,
    previsaoComercial: "Previsao: 1o trimestre de 2026",
    atualizadoEm: "24/03/2026",
    resumo: "Projeto em fase de disponibilidade residual com foco em conversao final das ultimas unidades.",
    destaques: ["Escassez de stock", "Alta taxa de reserva", "Seguimento comercial dedicado"],
    capa: resolveCover("azure"),
    galeria: resolveGallery("azure"),
  },
];

export function getEmpreendimentoBySlug(slug: string): Empreendimento | undefined {
  return empreendimentos.find((item) => item.slug === slug);
}
