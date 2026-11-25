# Sijil Design System Architecture

This document describes the architectural principles, boundaries, and design decisions behind `@sijil/ui` and its workspace.

---

## 1. Core Principles

1. **Strict Dependency Direction:**
   ```
   Consuming Application (sijil_hr, etc.)
               │
               ▼
   React components (@sijil/ui)
               ├── @sijil/theme → Tailwind CSS v4
               └── Headless primitives (Radix UI, CVA)
   ```
   The design system package has **zero knowledge** of consuming applications, authentication sessions, Redis proxies, API fetchers, or Next.js route structures.

2. **Single Responsibility & Modularity:**
   - Visual presentation is isolated into headless components emitting stable `data-slot` hooks.
   - Behavior and accessibility are delegated to established headless libraries (Radix UI primitives).
   - Component state logic (e.g. `useDateRangePickerState`, `useIsMobile`) is extracted into focused hooks.

3. **Separation of Presentation from Behavior:**
   - Primitives provide accessibility, focus trapping, keyboard navigation, and ARIA attributes.
   - Visual styling is driven entirely by Tailwind CSS v4 and the Design Family stylesheet.

4. **Zero-Lockin i18n Strategy:**
   - Components never import `react-i18next` or any specific translation library.
   - User-facing text and assistive labels default to English and can be overridden via `DesignSystemProvider`.

---

## 2. Token Architecture & Design Families

### Package Ownership

`@sijil/theme` provides shared colors, fonts, radii, shadows and transition defaults through Tailwind v4 theme variables. It also ships the shared Sijil palettes. `@sijil/ui` provides the React components, component-specific tokens, animations and family slot styles. The UI CSS entry points import the shared theme automatically.

### Semantic Contract

Tokens are divided into:
1. **Themed Tokens:** Change between light, dark, and dark-blue modes (surfaces, text, feedback, interactive states, elevation).
2. **Family Tokens:** Constant across color modes (corner radius, control heights, sidebar width, font stack).

### Zero-Specificity Family Stylesheets

Family slot styles target `:where(:root[data-ds-family="<family>"])`. Shared palette variables follow the light root and dark-mode selectors. Override the variable in a rule that matches the desired color mode.

---

## 3. Subpath Strategy & Bundle Efficiency

Rather than bundling all peer dependencies into a single monolithic bundle, `@sijil/ui` provides granular subpath exports configured via `package.json` `"exports"`:

| Export | Required Dependencies | Primary Use Cases |
| :--- | :--- | :--- |
| `@sijil/ui` | React, Radix UI, CVA, Tailwind | Buttons, Cards, Inputs, Dialogs, Selects, Tabs, Menus |
| `@sijil/ui/calendar` | `date-fns`, `react-day-picker` | DayPicker, Month navigation, Week numbers |
| `@sijil/ui/date-picker` | `date-fns`, `react-day-picker` | Two-step date range selection popovers |
| `@sijil/ui/chart` | `recharts` | Responsive charts, tooltips, legends |
| `@sijil/ui/command` | `cmdk` | Searchable command palette dialogs |
| `@sijil/ui/flex-table` | `@tanstack/react-table` | Sortable data tables with column visibility |
| `@sijil/ui/families` | None (pure JS/TS) | Family definitions and token contract |

This ensures that lightweight consumers (like small tools or mobile views) do not download or parse Recharts or DayPicker if they only need buttons, cards, and inputs.

---

## 4. Quality & Verification Gates

1. **Type Checking:** Strict TypeScript with `noUncheckedIndexedAccess`, declaration maps, and `.d.ts` emit.
2. **Package Validation:**
   - `publint`: Validates package.json exports, package files, and ESM syntax.
   - `attw` (Are The Types Wrong): Verifies TypeScript declaration resolution under `node16` and `bundler` resolution modes.
3. **Automated Unit & A11y Tests:**
   - Vitest + Testing Library + jsdom.
   - `vitest-axe` runs automated accessibility audits on interactive components (Buttons, Dialogs, SegmentedControls).
   - `tests/tokens.test.ts` validates that every token in the contract is present across the theme and component family stylesheets.
4. **Storybook:** Interactive isolated workbench rendering components with real-time theme, family, direction, and shell toggles.
