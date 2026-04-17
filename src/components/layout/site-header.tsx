"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { trackEvent } from "@/lib/client-tracking";
import { useModal } from "@/components/modals/modal-provider";

const topNav = [
  { href: "/", label: "HOME" },
  { href: "/promotores", label: "PARA PROMOTORES" },
  { href: "/parceiros", label: "PARA PARCEIROS" },
  { href: "/como-funciona", label: "COMO FUNCIONA" },
  { href: "/contactos", label: "CONTACTOS" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container-wrap header-shell">
        <div className="header-brand-zone">
          <Link href="/" className="header-brand-link" aria-label="Homeflix Home">
            <Image
              src="/homeflix-logo-legacy-root.png"
              alt="Homeflix"
              width={190}
              height={170}
              priority
              className="header-logo-image"
            />
          </Link>
          <div className="header-powered">
            <span>Powered by:</span>
            <strong>CRMPLUS</strong>
            <small>ADVANCED CRM TECHNOLOGY</small>
          </div>
        </div>

        <nav className="header-nav desktop-only" aria-label="Menu principal">
          {topNav.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${pathname === item.href ? "nav-link-active" : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="btn-primary header-main-cta desktop-only"
          onClick={() => {
            trackEvent({ event: "header_pedir_acesso", pathname, source: "header" });
            openModal("quickAccess");
          }}
        >
          PEDIR ACESSO
        </button>

        <button
          type="button"
          className="hamburger mobile-only"
          aria-expanded={open}
          aria-label="Abrir menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open ? (
        <div className="header-mobile-panel mobile-only">
          <nav className="container-wrap mobile-nav" aria-label="Menu mobile">
            {topNav.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-link ${pathname === item.href ? "nav-link-active" : ""}`} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              className="btn-primary w-full"
              onClick={() => {
                setOpen(false);
                trackEvent({ event: "mobile_header_pedir_acesso", pathname, source: "mobile_header" });
                openModal("quickAccess");
              }}
            >
              PEDIR ACESSO
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
