import Link from "next/link";
import { brand, legalLinks, navItems } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950">
      <div className="container-wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="brand-mark">{brand.name}</p>
          <p className="text-sm text-slate-300">{brand.tagline}</p>
          <p className="text-sm text-slate-400">{brand.institutionalLine}</p>
        </div>

        <div className="space-y-3">
          <p className="footer-title">Navegacao</p>
          <ul className="space-y-2 text-sm text-slate-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="footer-title">Conversao</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <Link href="/acesso" className="hover:text-white">
                Pedir acesso
              </Link>
            </li>
            <li>
              <Link href="/empreendimento" className="hover:text-white">
                Apresentar empreendimento
              </Link>
            </li>
            <li>
              <Link href="/demo" className="hover:text-white">
                Marcar demonstracao
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="footer-title">Legal</p>
          <ul className="space-y-2 text-sm text-slate-300">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="pt-2 text-sm text-slate-300">Contacto: geral@homeflix.im</p>
        </div>
      </div>
    </footer>
  );
}
