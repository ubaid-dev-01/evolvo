# Architecture — Evolvo

## Intent

Evolvo Technologies marketing site built with Next.js: services, careers (dynamic job routes), contact, and brand storytelling. Includes Apps Script setup notes for form backends.

## System shape

Server-first marketing site with client islands for interactive forms and theme toggles.

## Stack decisions

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui patterns

## Boundaries

- Secrets stay in environment variables / secret managers — never in git.
- Client bundles only receive public configuration (`NEXT_PUBLIC_*` / `VITE_*`).
- Tenant or role checks belong in middleware / server layers, not UI-only gates.
- Heavy or long-running work should not run inside short-lived serverless handlers unless designed for it.

## Quality bar

- Prefer typed contracts at API and domain boundaries.
- Ship a vertical slice (auth → persisted outcome) before a broad feature surface.
- Document trade-offs in PRs when changing data models or auth.

