# @sijil/ui

> Standalone, production-ready, private Design System and UI Component Library for Sijil company projects.

`@sijil/ui` is built on headless accessible primitives (Radix UI, React Day Picker, Recharts, cmdk), Class Variance Authority (CVA), and Tailwind CSS v4. It features a semantic design token engine supporting multiple design families, dark mode variants, RTL/LTR layout transitions, and touch-first mobile shells.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Design Families & Themes](#design-families--themes)
- [Design Tokens Reference](#design-tokens-reference)
- [Subpath Entry Points](#subpath-entry-points)
- [Project-Level Customization](#project-level-customization)
- [Adding New Design Families](#adding-new-design-families)
- [Publishing & Versioning](#publishing--versioning)

---

## Features

- **Decoupled Architecture:** 100% free of application business logic, Next.js routing, authentication, or Redis sessions.
- **Tree-Shakeable Subpaths:** Core components have minimal dependencies; heavy or optional dependencies (`recharts`, `date-fns`, `react-day-picker`, `cmdk`, `@tanstack/react-table`) reside behind dedicated subpaths.
- **Design Families:** Support for multiple independent visual directions sharing the exact same headless behavior and component APIs.
- **Accessible & Internationalized:** Built on Radix UI, supporting keyboard navigation, focus management, ARIA attributes, RTL/LTR flipping, and framework-agnostic localized labels.
- **Strict TypeScript:** Compiled to strict ESM with `.d.ts` declaration files and declaration maps. Passes `publint` and `attw` (Are The Types Wrong).

---

## Installation

Configure access to your company's private package registry in `.npmrc`:

```ini
@sijil:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Install `@sijil/ui` and required peer dependencies:

```bash
# Using bun
bun add @sijil/ui react react-dom tailwindcss lucide-react

# Using npm
npm install @sijil/ui react react-dom tailwindcss lucide-react
```

For features requiring specialized subpaths:

```bash
# For @sijil/ui/calendar and @sijil/ui/date-picker
bun add date-fns react-day-picker

# For @sijil/ui/chart
bun add recharts

# For @sijil/ui/command
bun add cmdk

# For @sijil/ui/flex-table
bun add @tanstack/react-table
```

---

## Quick Start

### 1. Import Styles

In your application's global CSS file (e.g. `src/app/globals.css`):

```css
@import "tailwindcss";
@import "@sijil/ui/theme.css";
@import "@sijil/ui/families/sijil.css";
```

### 2. Configure HTML Attributes

Set the design family attribute on the root `<html>` element:

```html
<html lang="en" data-ds-family="sijil" class="light">
  <body>...</body>
</html>
```

### 3. Mount the Provider

Wrap your application root with `DesignSystemProvider`:

```tsx
import { DesignSystemProvider } from "@sijil/ui";

export function App({ children }) {
  return (
    <DesignSystemProvider
      direction="ltr" // or "rtl"
      locale="en"
      labels={{
        close: "Close dialog",
        more: "More actions",
        noResults: "No records found.",
      }}
    >
      {children}
    </DesignSystemProvider>
  );
}
```

### 4. Use Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@sijil/ui";

export function UserCard() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Ahmed Mansour</CardTitle>
        <Badge variant="secondary">Active</Badge>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="sm">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## Design Families & Themes

The design system supports multiple design families. Each family provides a cohesive visual aesthetic and defines all tokens in the semantic contract.

### The Initial Family: `sijil`

- **Visual identity:** Deep navy brand palette (`#213d67`), rounded corners (`border-radius: 0.35rem`, surfaces up to `2xl`), subtle card elevation shadows, and neutral input borders.
- **Themes:**
  - `light` (default): Crisp white surfaces on `#f3f3f3` background.
  - `dark`: Deep black surfaces (`#000000`, card `#15161a`).
  - `dark-blue`: Navy dark mode (`#0d1525`, card `#18223a`).

Switching themes is as simple as toggling `.dark` or `.dark-blue` on the root element.

---

## Design Tokens Reference

All components bind strictly to CSS custom properties defined in the semantic contract:

| Category | Tokens | Description |
| :--- | :--- | :--- |
| **Surfaces & Text** | `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground` | Base canvas and surface card backgrounds and foregrounds |
| **Brand Colors** | `--primary`, `--primary-hover`, `--primary-glow`, `--primary-foreground`, `--secondary`, `--secondary-hover`, `--secondary-foreground`, `--accent`, `--accent-foreground` | Main interactive brand palette and secondary button fills |
| **Feedback** | `--color-success`, `--color-danger`, `--color-warning`, `--color-info` (+ `*-light`, `*-border`, `*-text`) | Semantic status highlights for forms, badges, and alerts |
| **Interaction** | `--hover-bg`, `--hover-border`, `--hover-text` | Subtle neutral hover treatments across buttons, tabs, and menus |
| **Form Controls** | `--border`, `--input`, `--ring` | Inputs, checkboxes, selects, and focus rings |
| **Structure** | `--radius`, `--sidebar-width`, `--control-h-xs`, `--control-h-sm`, `--control-h-md`, `--control-h-lg` | Structural scale independent of color theme |
| **Elevation** | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` | Elevation shadows adapting automatically between light and dark modes |

---

## Subpath Entry Points

To preserve small bundle sizes and avoid forcing consumers to install unneeded peer dependencies, `@sijil/ui` provides explicit modular subpaths:

```tsx
// 1. Core Primitives (minimal peers: React, Radix UI, CVA, Tailwind)
import { Button, Input, Dialog, Select, Tabs, Card, Sheet, Sidebar } from "@sijil/ui";

// 2. Calendar (peers: react-day-picker, date-fns)
import { Calendar, CalendarDayButton, CalendarLocaleProvider } from "@sijil/ui/calendar";

// 3. Date Range Picker (peers: react-day-picker, date-fns)
import { DateRangePicker } from "@sijil/ui/date-picker";

// 4. Charting (peer: recharts)
import { ChartContainer, ChartTooltip, ChartLegend } from "@sijil/ui/chart";

// 5. Command Palette (peer: cmdk)
import { Command, CommandDialog, CommandInput, CommandList } from "@sijil/ui/command";

// 6. Data Table (peer: @tanstack/react-table)
import { FlexTable } from "@sijil/ui/flex-table";

// 7. Design Family Registry & Token Constants (framework-agnostic)
import { designFamilies, sijilFamily, THEMED_TOKENS } from "@sijil/ui/families";
```

---

## Project-Level Customization

Consuming projects customize the design system without modifying library source code:

1. **Semantic CSS Token Overrides:**
   ```css
   /* In your app's globals.css, after importing the family */
   :root {
     --primary: #0284c7; /* Switch primary to Sky blue */
     --radius: 0.5rem;   /* Increase corner radius */
   }
   ```
2. **`className` Composition:**
   Every component merges custom classes via `tailwind-merge` (`cn`), ensuring caller overrides take precedence.
3. **Radix Slots (`asChild`):**
   Components like `Button` and `Badge` support `asChild` for polymorphic rendering (e.g. Next.js `<Link>`).
4. **Context Labels & Direction:**
   Translate internal labels using `DesignSystemProvider` `labels` prop.

---

## Adding New Design Families

1. Create a stylesheet under `styles/families/<family-name>/`:
   - `tokens.css`: defines `:where(:root[data-ds-family="<family-name>"])` tokens.
   - `base.css`: defines family-specific slot rules on `[data-slot="..."]`.
   - `index.css`: imports both files.
2. Register the family in `src/families/<family-name>.ts`:
   ```ts
   export const novaFamily = {
     id: "nova",
     label: "Nova",
     themes: [
       { id: "light", label: "Light", dark: false },
       { id: "dark", label: "Dark", dark: true },
     ],
   } as const satisfies DesignFamilyDefinition;
   ```
3. Add the family to `designFamilies` array in `src/families/registry.ts`.
4. Export the CSS path in `package.json` `"exports"` field:
   `"./families/nova.css": "./styles/families/nova/index.css"`.

---

## Publishing & Versioning

- Versioning is automated using **Changesets** (`bun run changeset`, `bun run version-packages`).
- Release builds run `tsc -p tsconfig.build.json` and publish restricted packages.
- A built-in guard (`scripts/assert-private-registry.mjs`) automatically halts publication if an attempt is made to publish to the public npm registry.

