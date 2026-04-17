"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProjectGalleryCarouselProps = {
  projectName: string;
  images: string[];
};

export function ProjectGalleryCarousel({ projectName, images }: ProjectGalleryCarouselProps) {
  const gallery = useMemo(() => (images.length > 0 ? images : ["/homeflix-hero-bg.png"]), [images]);
  const [active, setActive] = useState(0);

  const currentImage = gallery[active];

  const prev = () => setActive((value) => (value - 1 + gallery.length) % gallery.length);
  const next = () => setActive((value) => (value + 1) % gallery.length);

  return (
    <div className="panel panel-dark">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-800">
        <Image
          src={currentImage}
          alt={`Galeria do empreendimento ${projectName}`}
          fill
          sizes="(max-width: 1024px) 100vw, 64vw"
          className="object-cover"
        />
        <span className="empreendimento-watermark empreendimento-watermark-strong" aria-hidden />

        {gallery.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-500/60 bg-slate-950/70 text-slate-100 transition hover:bg-slate-900"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Imagem seguinte"
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-500/60 bg-slate-950/70 text-slate-100 transition hover:bg-slate-900"
            >
              <ChevronRight size={20} />
            </button>
          </>
        ) : null}
      </div>

      {gallery.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className={`relative aspect-[4/3] overflow-hidden rounded-md border ${
                index === active ? "border-cyan-400" : "border-slate-700"
              }`}
              onClick={() => setActive(index)}
              aria-label={`Ver imagem ${index + 1}`}
            >
              <Image src={src} alt={`Miniatura ${index + 1}`} fill sizes="120px" className="object-cover" />
              <span className="empreendimento-watermark empreendimento-watermark-thumb" aria-hidden />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
