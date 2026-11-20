<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

<!--PROJECT START-->

# solid-element-ui — AI Agent Guide

## 📦 Project Overview

**solid-element-ui** is a SolidJS component library built as a **thin wrapper** around [Kobalte](https://kobalte.dev/) (headless UI primitives for SolidJS). It adds Tailwind CSS v4 styling merged through [`cn`](https://github.com/shadcn-ui/cn). The library is published as the npm package `solid-element-ui`.

### Monorepo Structure

| Path           | Purpose                                                          |
| -------------- | ---------------------------------------------------------------- |
| `packages/ui/` | 📦 The component library source (`solid-element-ui` npm package) |
| `apps/docs/`   | 📖 Documentation site built with SolidBase (SolidBase 3 + MDX)   |
| `tools/`       | (Reserved for future tooling)                                    |

### Quick Start Commands

```bash
vp install         # Install all dependencies (uses bun)
vp check           # Lint + format + type check (oxlint + oxfmt + tsc)
vp test            # Run tests (vitest via Vite+)
vp run -r build    # Build all workspaces
vp run example-docs#dev  # Start docs dev server (apps/docs)
vp run ready       # Full CI check: check → test → build
```

### Package Manager & Runtime

- **Toolchain**: Vite+ `1.7.0` (`vp`, wraps Vite 8.3, Vitest 5, Oxlint, Oxfmt)
- **Package manager**: `bun` v1.4.4 (specified in `devEngines.packageManager`)
- **Node**: `>=22.18.0`
- **TypeScript**: `^5.7` with `verbatimModuleSyntax`, `erasableSyntaxOnly`, `strict: true`

---

## 🧩 Component Conventions

Every component in `packages/ui/core/<name>/<name>.tsx` follows this pattern:

### 1. Architecture: Kobalte Wrapper

Each component wraps a Kobalte primitive (imported with `K` prefix) and adds Tailwind styling:

```tsx
import { Button as KButton } from "@kobalte/core/button";
import { omit } from "solid-js";
import { cn } from "cn";
```

### 2. Styles: `cn` (class merging)

`packages/ui/utils/cn.ts` re-exports [`cn`](https://github.com/shadcn-ui/cn) (`shadcn-ui/cn`) — a drop-in replacement for `clsx` + `tailwind-merge` with the same merging semantics. Components build classes as plain strings:

```tsx
class={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs", props.class)}
```

Reusable class sets live in the sibling `<name>/setting.ts` (`defaultClass`, variant maps); components pick the variant string and pass it to `cn` together with `props.class` so the consumer's classes win.

### 3. Props: Three-Way `splitProps`

Almost all components split props into three groups:

- **local**: Component-consumed props (`class`, `children`, custom props like `loading`, `leftIcon`)
- **variantKeys**: variant keys (`variant`, `size`, `color`, `orientation`)
- **others**: Remaining props forwarded to the Kobalte root component

```tsx
const [local, variantKeys, others] = splitProps(
  props,
  ["class", "children", "loading"], // local
  ["variant", "size", "color"], // variant keys
);
```

Simple components without variants may use two-way split (local + others), or `omit(props, ...)`.

### 4. Export Pattern

- Each component folder has a single `<name>.tsx` file (no `index.tsx`)
- All exports are re-exported from `packages/ui/core/index.tsx`
- `ComponentProps<typeof KComponent>` is used for type intersection

### 5. Compound Components (Meter pattern)

For components with multiple sub-components (like `<Meter.Label>`, `<Meter.Track>`), use `Object.assign`:

```tsx
export const Meter = Object.assign(Root, { Label, Track, Fill, ValueText });
```

---

## 🎨 Style System

### Tailwind CSS v4

Uses `@tailwindcss/vite` plugin (NOT PostCSS). Key differences from v3:

- `@import "tailwindcss"` instead of `@tailwind` directives
- `@theme` block for design tokens
- `@custom-variant` for custom variants
- `@source` to scan additional paths for class detection

### Semantic Color Tokens

All components use CSS variable-based semantic colors (defined in `packages/ui/style/theme.css`):

| Token                                        | Usage                                   |
| -------------------------------------------- | --------------------------------------- |
| `primary` / `success` / `warning` / `danger` | Semantic colors (blue/green/orange/red) |
| `main` / `muted` / `reversal`                | Text colors                             |
| `app` / `foreground` / `reversal-bg`         | Background colors                       |
| `base` / `light` / `ring`                    | Border/ring colors                      |

**⚠️ Always use these semantic tokens, NOT hardcoded Tailwind colors** (like `zinc-950` or `dark:`). Some older components still use hardcoded values — prefer the token system for new code.

### Dark Mode

Uses custom `data-theme` attribute (NOT `class` or `prefers-color-scheme`):

- `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))`
- Switch themes via `document.documentElement.setAttribute("data-theme", val)`
- Supported themes: `light` (default), `dark`, `coffee`
- CSS variables switch in `[data-theme="dark"]` / `[data-theme="coffee"]` blocks

### Global CSS Import

The library's `style/theme.css` is imported in `core/index.tsx`. Consumers can also import `solid-element-ui/index.css`.

### Animation Tokens

Defined in `theme.css`: `accordion-down`, `fade-in`, `fade-out`, `slide-in`, `collapsible-down/up`, `swipe-out`. Use via `animate-*` utility classes.

---

## 📐 Documentation Site (apps/docs)

- **Framework**: [SolidBase](https://solidbase.dev) `@kobalte/solidbase` v3 on `@solidjs/vite-plugin` start mode (no SolidStart/Vinxi)
- **Routing**: File-based routing from `apps/docs/src/routes` via `virtual:file-routes` + `@solidjs/router/fs`
- **Content**: `.mdx` / `.md` pages in `apps/docs/src/routes/` (currently only a placeholder `index.mdx`)
- **Shell**: `src/app.tsx` (router + `SolidBaseRoot`), `src/Document.tsx` (SSR document), `src/global.d.ts` (SolidBase virtual module types)
- **Config**: `apps/docs/vite.config.ts` → `createSolidBase(defaultTheme).plugin({...})` + `solid(solidBase.startConfig())`
- **Output**: `vp build` emits SSR output to `dist/server` and prerenders pages into `dist/client`

---

## 📦 Key Dependencies

| Package                       | Purpose                                               |
| ----------------------------- | ----------------------------------------------------- |
| `solid-js` 2.0.3              | SolidJS core (peer dependency)                        |
| `@solidjs/web` 2.0.3          | Solid 2 DOM renderer / JSX runtime                    |
| `@kobalte/core` 2.0.0-alpha.4 | Headless UI primitives (accessibility + behavior)     |
| `cn` ^0.5.2                   | Tailwind class merging (replaces clsx+tailwind-merge) |
| `tailwindcss` ^4.3.5          | Tailwind CSS v4 (with `@tailwindcss/vite`)            |
| `@kobalte/solidbase` ^3.0     | Static site generation engine for the docs site       |

---

## ⚠️ Common Pitfalls

1. **Dark mode inconsistency**: Some components use hardcoded `zinc` colors or `dark:` prefix instead of semantic tokens — prefer the CSS variable system for new components.
2. **`verbatimModuleSyntax: true`**: Always use `import type` for type-only imports. Never use `enum` (disallowed by `erasableSyntaxOnly`).
3. **Global CSS imported at package root**: `import "../style/theme.css"` in `core/index.tsx` means styles are bundled. For consumers, use `solid-element-ui/index.css`.
4. **AlertDialog uses internal state**: It manages `isOpen` internally via `createSignal` and does NOT accept `open`/`onOpenChange` from parents.
5. **No SSR guards**: Most components don't check `isServer` — only Toast does. Be mindful of SSR if adding new browser-API-dependent code.
6. **Children as render prop**: `ToggleButton` accepts children as a function `{(state) => ...}` pattern — check component's type definition.
7. **Chinese text hardcoded**: Some components have Chinese UI strings (Dialog "关闭", AlertDialog "取消"/"确认") — these are intentional.
8. **Components without `class` forwarding**: Always merge the component's classes with `props.class` through `cn(...)` (consumer classes last) so consumer overrides win.

---

## 🔧 Build Configuration

- `packages/ui/vite.config.ts`: Builds library as ESM, externalizes `solid-js`, `@solidjs/web`, `@kobalte/core` (incl. subpaths) and `cn`
- `packages/ui/tsconfig.json`: `jsx: preserve`, `jsxImportSource: @solidjs/web`, `moduleResolution: bundler`
- Root `vite.config.ts` configures oxlint rules for Vite+

<!--PROJECT END-->
