import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { ModalProvider } from "@/components/modals/modal-provider";
import { brand } from "@/content/site";
import { getSiteUrl } from "@/lib/site-metadata";
import { PageTracker } from "@/components/analytics/page-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${brand.name} | ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Infraestrutura premium de partilha imobiliaria para promotores, construtores e parceiros imobiliarios validados.",
  openGraph: {
    title: `${brand.name} | ${brand.tagline}`,
    description:
      "Infraestrutura premium de partilha imobiliaria para promotores, construtores e parceiros imobiliarios validados.",
    type: "website",
    locale: "pt_PT",
    siteName: "Homeflix",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-50">
        <ModalProvider>
          <PageTracker />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <StickyMobileCta />
        </ModalProvider>
      </body>
    </html>
  );
}
