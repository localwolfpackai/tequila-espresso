<p align="center">
  <img src="logo.svg" alt="Lupo Studios" width="56" height="56" />
</p>

# Tequila Espresso

A warm, token-driven design system built on Next.js 16 -- accessible primitives, composable blocks, and a live theme studio.

## Features

- **50+ components** -- buttons, dialogs, tables, sidebars, charts, and more, all keyboard-accessible
- **Token-driven theming** -- oklch color scale, 8pt spacing, radius and shadow tokens with light/dark mode
- **Theme Studio** -- edit colors, radius, and shadows live with instant preview
- **Interactive playground** -- browse and test every component in one sandbox
- **Per-component docs** -- usage, props, and accessibility notes for each primitive
- **Composed blocks** -- pricing cards, login forms, stats grids, CTAs ready to drop in
- **Chart library** -- area, bar, line, pie, and sparkline charts via Recharts
- **Custom hooks** -- debounce, toggle, local storage, copy-to-clipboard, disclosure, toast
- **Full test coverage** -- unit tests (Vitest + Testing Library) and E2E (Playwright)

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, oklch design tokens |
| Primitives | Radix UI |
| Motion | Framer Motion 12 |
| Forms | React Hook Form + Zod 4 |
| Charts | Recharts 3 |
| Testing | Vitest, Testing Library, Playwright |
| Icons | Lucide |

## Quick Start

```bash
git clone https://github.com/localwolfpackai/tequila-espresso.git
cd tequila-espresso
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) to browse the playground, component docs, and theme studio.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:e2e` | E2E tests (Playwright) |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | Type-check with tsc |

## License

MIT

---

Created by [Lupo Studios](https://github.com/localwolfpackai)
