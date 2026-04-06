# Tequila Espresso

A design system for warm, considered interfaces — accessible primitives, token-driven themes, and documented patterns.

## Quick Start

```bash
git clone https://github.com/localwolfpackai/tequila-espresso.git
cd tequila-espresso
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) to browse the playground, component docs, and theme studio.

## What's Inside

```
components/
  ui/           30+ primitives — button, dialog, tabs, accordion, combobox, sidebar...
  blocks/       Composed patterns — pricing cards, login forms, stats grids, CTAs
  charts/       Recharts wrappers — area, bar, line, pie, sparkline
  layouts/      App shell, site nav
  providers/    Theme + app context

lib/
  hooks/        use-debounce, use-toggle, use-local-storage, use-copy-to-clipboard
  validators/   Zod schemas (contact form, etc.)

styles/
  globals.css   Design tokens — oklch color scale, 8pt spacing, radius, shadow, type

app/
  /             Landing + hero
  /playground   Interactive component sandbox
  /docs/[slug]  Per-component documentation
  /themes       Theme studio — live color + radius editing
  /blocks       Composed block gallery
```

## Stack

- **Framework:** Next.js 16, React 19, TypeScript 5
- **Styling:** Tailwind CSS 4, CSS custom properties (oklch color space)
- **Primitives:** Radix UI (accordion, dialog, dropdown, tabs, tooltip, and more)
- **Motion:** Framer Motion 12
- **Forms:** React Hook Form + Zod 4
- **Charts:** Recharts 3
- **Testing:** Vitest, Testing Library, Playwright
- **Icons:** Lucide

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Type-check with tsc |

## License

MIT

---

Built by [Lupo Studios](https://github.com/localwolfpackai)
