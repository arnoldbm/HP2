# Repository Guidelines

## Project Structure & Module Organization
This Turborepo monorepo keeps active apps under `packages/`. `packages/web` hosts the Next.js client (App Router) with UI in `components/`, routes in `app/`, and Playwright suites in `tests/`. `packages/mobile` contains the Expo app with screens in `app/` and shared UI under `components/`. Cross-cutting domain logic sits in `packages/shared/src`, exported as `@hockeypilot/shared`. Docs live in `docs/`, while Supabase migrations and seeds stay in `supabase/migrations` and `supabase/seeds`. Ignore generated output such as `.next/` or `dist/`.

## Build, Test, and Development Commands
Install once at the repo root with `npm install`. Run `npm run dev` to launch workspace dev tasks through Turborepo; scope with `npm run dev -- --filter=@hockeypilot/web`. `npm run build` produces production bundles, `npm run lint` enforces ESLint, and `npm run test` fans out unit suites. Within `packages/web`, use `npm run test` (Vitest) or `npm run test:e2e` (Playwright). Bring up Supabase services via `npx supabase start`; reset schema with `npx supabase db reset`.

## Coding Style & Naming Conventions
TypeScript everywhere with strict mode enabled. Prettier (2-space indent, single quotes) and ESLint (`eslint-config-next`, `eslint-config-prettier`) handle formatting—run `npx prettier --check .` if your editor skips it. Use PascalCase for components (`ShotChart.tsx`), camelCase for hooks (`useShotMetrics.ts`), and kebab-case for folders. Prefer named exports routed through the `@/...` alias. Tailwind ordering is automated by the PostCSS plugin.

## Testing Guidelines
`packages/web/tests` hosts unit, integration, and E2E specs; mirror new files in the matching folder using `*.test.ts(x)` or `*.spec.ts(x)`. Shared package tests sit alongside source in `packages/shared/src`. Mobile relies on Jest with Testing Library under `packages/mobile/tests`. Keep coverage at 90%+ and stub Supabase calls instead of hitting the network. Register any new Playwright fixtures in `tests/setup.ts`.

## Commit & Pull Request Guidelines
Git history uses Conventional Commit prefixes (`feat:`, `fix:`, `chore:`); keep subjects imperative and add measurable context when helpful. Rebase onto `main` before opening a PR. Provide scope, linked issues, and manual validation steps, plus screenshots for UI updates. Call out Supabase config or migration changes so reviewers can reproduce the environment.
