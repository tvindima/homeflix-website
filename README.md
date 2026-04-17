# Homeflix Website

Website institucional e comercial da Homeflix, focado em captacao e qualificacao de:

- promotores / construtores (`/empreendimento`)
- parceiros imobiliarios (`/acesso`)

Nao e um portal de pesquisa publica de imoveis.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- API routes para leads e analytics

## Arranque local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Formularios e dados

Leads e eventos sao guardados em ficheiros `jsonl` na pasta local `data/`:

- `data/leads_access.jsonl`
- `data/leads_empreendimento.jsonl`
- `data/leads_contacto.jsonl`
- `data/leads_demo.jsonl`
- `data/analytics_events.jsonl`
- `data/email_queue.jsonl` (fallback quando email provider nao esta configurado)

## Email (opcional)

Se configurar Resend, os emails passam a ser enviados em tempo real.

Variaveis de ambiente:

- `RESEND_API_KEY`
- `RESEND_FROM` (ex.: `Homeflix <no-reply@homeflix.im>`)
- `LEADS_INTERNAL_EMAIL` (destino interno)
- `NEXT_PUBLIC_SITE_URL` (ex.: `https://homeflix.im`)

## Validacao e seguranca minima

- validacao client-side e server-side
- honeypot anti-spam
- rate limiting em endpoints de formularios/analytics
- upload controlado (tipos e tamanho) para comprovativos

## SEO tecnico

- metadata por pagina
- canonical
- Open Graph base
- `sitemap.xml`
- `robots.txt`
