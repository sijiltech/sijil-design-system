# Sijil Design System (@sijil/ui) — Comprehensive Usage Guide

> Production-ready, framework-agnostic, accessible, and customizable UI component library for Sijil products.

---

## Table of Contents

1. [Overview & Architectural Philosophy](#1-overview--architectural-philosophy)
2. [Installation & Project Setup](#2-installation--project-setup)
   - [Next.js (App Router)](#21-nextjs-app-router-setup)
   - [Vite / React SPA](#22-vite--react-spa-setup)
   - [Tailwind CSS v4 Configuration](#23-tailwind-css-v4-configuration)
3. [Providers & Configuration](#3-providers--configuration)
   - [DesignSystemProvider](#31-designsystemprovider)
   - [RTL and LTR Support](#32-rtl-and-ltr-support)
   - [CalendarLocaleProvider](#33-calendarlocaleprovider)
4. [Design Tokens & Theming](#4-design-tokens--theming)
   - [Theme Modes (Light, Dark, Dark-Blue)](#41-theme-modes)
   - [Customizing Tokens (Zero-Specificity Overrides)](#42-customizing-tokens)
   - [Design Families Concept](#43-design-families-concept)
5. [Component Catalog & Practical Patterns](#5-component-catalog--practical-patterns)
   - [5.1 Buttons & Actions](#51-buttons--actions)
   - [5.2 Form Controls & Field Structure](#52-form-controls--field-structure)
   - [5.3 Overlays, Modals & Drawers](#53-overlays-modals--drawers)
   - [5.4 Screen Shells & Layout Primitives](#54-screen-shells--layout-primitives)
   - [5.5 Navigation, Tabs & Segmented Control](#55-navigation-tabs--segmented-control)
   - [5.6 Data Tables (Standard & FlexTable)](#56-data-tables-standard--flextable)
   - [5.7 Date Pickers & Calendars](#57-date-pickers--calendars)
   - [5.8 Feedback, Badges & Empty States](#58-feedback-badges--empty-states)
   - [5.9 Command Palette (Search & Quick Actions)](#59-command-palette)
   - [5.10 Charts & Metrics](#510-charts--metrics)
6. [Best Practices & Rules](#6-best-practices--rules)
7. [Troubleshooting & FAQ](#7-troubleshooting--faq)

---

## 1. Overview & Architectural Philosophy

`@sijil/ui` is designed from the ground up according to strict **SOLID principles**:

- **Strict Dependency Direction (`Application → @sijil/ui → Primitives`):** The package is 100% agnostic of consuming applications. It contains zero business logic, zero API fetchers, and zero hardcoded routes or translation keys.
- **Single Responsibility (SRP):** Presentation is decoupled from application state. Interactive logic relies on battle-tested headless primitives (**Radix UI**, **React Day Picker**, **cmdk**, **Recharts**).
- **Subpath Modularity:** Heavy peer dependencies (such as `recharts`, `date-fns`, `@tanstack/react-table`) are placed behind dedicated subpaths so lightweight consumers never download unnecessary dependencies.
- **Accessibility by Default:** Built-in keyboard navigation, ARIA attributes, focus trapping, and screen-reader compliant labeling.
- **RTL/LTR Native:** Bidirectional support is built-in with automatic layout flipping for Arabic and English.

---

## 2. Installation & Project Setup

### Package Registry Setup

If consuming from your company's private GitHub Packages or npm registry, create or update `.npmrc`:

```ini
@sijil:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Or for local development via workspace / file dependency:

```json
{
  "dependencies": {
    "@sijil/ui": "file:../sijil-design-system/packages/ui"
  }
}
```

### Installing Dependencies

```bash
# Core package & direct peer dependencies
npm install @sijil/ui react react-dom lucide-react tailwindcss
# or with bun:
bun add @sijil/ui react react-dom lucide-react tailwindcss
```

#### Optional Subpath Dependencies (Install only what you need):

```bash
# For @sijil/ui/calendar and @sijil/ui/date-picker
npm install date-fns react-day-picker

# For @sijil/ui/chart
npm install recharts

# For @sijil/ui/command
npm install cmdk

# For @sijil/ui/flex-table
npm install @tanstack/react-table
```

---

### 2.1 Next.js (App Router) Setup

#### 1. Configure `next.config.ts`:

Because `@sijil/ui` is an ESM package distributed with modern TypeScript and CSS imports, include it in `transpilePackages`. If linking across local repositories with Turbopack, also specify the workspace `root`:

```ts
import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@sijil/ui"],
  turbopack: {
    // Allows Turbopack to resolve packages outside current project folder
    root: path.resolve(process.cwd(), "../../.."),
  },
};

export default nextConfig;
```

#### 2. Import CSS in `src/app/globals.css`:

```css
@import "tailwindcss";
@import "@sijil/ui/theme.css";
@import "@sijil/ui/families/sijil.css";

/* Any project-specific custom overrides go below */
```

#### 3. Set the Design Family attribute on `<html>` in `src/app/layout.tsx`:

```tsx
import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-ds-family="sijil" className="light">
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
```

---

### 2.2 Vite / React SPA Setup

#### 1. Import CSS in your main entry file (e.g. `src/main.tsx` or `src/index.css`):

```css
@import "tailwindcss";
@import "@sijil/ui/theme.css";
@import "@sijil/ui/families/sijil.css";
```

#### 2. Ensure `index.html` defines the `data-ds-family`:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl" data-ds-family="sijil">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sijil App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 3. Providers & Configuration

### 3.1 DesignSystemProvider

Wrap your application in `DesignSystemProvider`. It manages:
1. Direction (`"rtl"` or `"ltr"`).
2. Locale code (e.g. `"ar"`, `"en"`).
3. Localized accessible labels for internal dialog close buttons, empty states, and pagination.

```tsx
"use client";

import { DesignSystemProvider } from "@sijil/ui";
import type { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
  direction?: "rtl" | "ltr";
  locale?: string;
}

export function AppProviders({
  children,
  direction = "rtl",
  locale = "ar",
}: AppProvidersProps) {
  return (
    <DesignSystemProvider
      direction={direction}
      locale={locale}
      labels={{
        close: locale === "ar" ? "إغلاق النافذة" : "Close dialog",
        more: locale === "ar" ? "المزيد من الإجراءات" : "More actions",
        noResults: locale === "ar" ? "لا توجد نتائج مطابقة." : "No records found.",
      }}
    >
      {children}
    </DesignSystemProvider>
  );
}
```

### 3.2 RTL and LTR Support

The package automatically aligns modals, dropdown menus, sheets, tooltips, and tables based on the active direction:
- `direction="rtl"` flips chevron icons, popover alignment edges, and calendar week column layouts.
- `useDirection()` can be consumed anywhere to read the current layout direction.

### 3.3 CalendarLocaleProvider

When using `@sijil/ui/calendar` or `@sijil/ui/date-picker`, mount `CalendarLocaleProvider` to supply `date-fns` locales:

```tsx
import { CalendarLocaleProvider } from "@sijil/ui/calendar";
import { ar, enUS } from "date-fns/locale";

export function CalendarProviders({ children, isArabic }: { children: React.ReactNode; isArabic: boolean }) {
  return (
    <CalendarLocaleProvider config={{ locale: isArabic ? ar : enUS }}>
      {children}
    </CalendarLocaleProvider>
  );
}
```

---

## 4. Design Tokens & Theming

### 4.1 Theme Modes

The initial design family (`sijil`) includes 3 pre-built color themes:

| Theme | Selector | Visual Atmosphere |
| :--- | :--- | :--- |
| **Light** | `:root` or `.light` | Clean white surfaces on `#f3f3f3` canvas |
| **Dark** | `.dark` | True dark mode with deep black and `#15161a` cards |
| **Dark-Blue** | `.dark-blue` | Sophisticated navy dark palette with `#0d1525` canvas |

To activate a theme, simply toggle the class on the `<html>` or `<body>` element:

```tsx
// Toggle dark mode:
document.documentElement.classList.add("dark");
document.documentElement.classList.remove("light", "dark-blue");
```

### 4.2 Customizing Tokens

Tokens use `:where(:root[data-ds-family="sijil"])` zero-specificity selectors. Consuming projects can override any token in their application's `globals.css` with zero specificity conflicts:

```css
/* Customizing tokens in your project */
:root {
  --primary: #0284c7;           /* Custom primary brand color */
  --primary-hover: #0369a1;
  --radius: 0.5rem;             /* Modern softer corner radius */
  --control-h-md: 2.75rem;      /* Taller form inputs */
}

.dark {
  --primary: #38bdf8;
  --card: #181c24;
}
```

### 4.3 Key Semantic Tokens

| Token | Semantic Purpose |
| :--- | :--- |
| `--background` / `--foreground` | Default page background and base text |
| `--card` / `--card-foreground` | Elevation cards and panels |
| `--primary` / `--primary-foreground` | Main interactive brand buttons and highlights |
| `--secondary` / `--secondary-foreground` | Subtle surface buttons and secondary chips |
| `--color-success` / `--color-danger` | Status alerts, badges, and validation messages |
| `--border` / `--input` | Outlines for inputs, selects, and table separators |
| `--radius` | Base border radius scale across all components |

---

## 5. Component Catalog & Practical Patterns

### 5.1 Buttons & Actions

The `Button` component supports comprehensive variants, sizes, loading states, and polymorphic rendering via `asChild`.

```tsx
import { Button } from "@sijil/ui";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link"; // or react-router-dom Link

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Default Brand Button */}
      <Button variant="default" size="default">
        <Plus className="w-4 h-4" />
        إضافة موظف
      </Button>

      {/* Secondary Button */}
      <Button variant="secondary" size="sm">
        تعديل
      </Button>

      {/* Outline & Ghost */}
      <Button variant="outline">إلغاء</Button>
      <Button variant="ghost">تجاهل</Button>

      {/* Destructive Action */}
      <Button variant="destructive" size="sm">
        <Trash2 className="w-4 h-4" />
        حذف
      </Button>

      {/* Polymorphic Link (Renders Next.js <Link> with Button styles) */}
      <Button asChild variant="link">
        <Link href="/user/attendance">
          عرض سجل الحضور
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </Button>
    </div>
  );
}
```

---

### 5.2 Form Controls & Field Structure

Always structure form inputs with `Field`, `FieldLabel`, and `FieldError` for accessible ARIA association:

```tsx
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Switch,
  Label,
} from "@sijil/ui";
import { useState } from "react";

export function UserForm() {
  const [role, setRole] = useState("developer");
  const [notifications, setNotifications] = useState(true);

  return (
    <form className="space-y-4 max-w-md p-6 bg-card border rounded-lg">
      {/* Text Input with Field wrapper */}
      <Field>
        <FieldLabel htmlFor="full-name">الاسم بالكامل</FieldLabel>
        <Input id="full-name" placeholder="أدخل اسم الموظف..." />
        <FieldDescription>الاسم كما يظهر في الوثائق الرسمية.</FieldDescription>
      </Field>

      {/* Select Dropdown */}
      <Field>
        <FieldLabel>المسمى الوظيفي</FieldLabel>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="اختر المسمى الوظيفي..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manager">مدير قسم</SelectItem>
            <SelectItem value="developer">مهندس برمجيات</SelectItem>
            <SelectItem value="designer">مصمم واجهات</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      {/* Checkbox with Accessible Label */}
      <div className="flex items-center gap-2">
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms" className="cursor-pointer">
          الموافقة على سياسة الإجازات الرسمية
        </Label>
      </div>

      {/* Switch Toggle */}
      <div className="flex items-center justify-between py-2 border-t">
        <Label htmlFor="notif-switch" className="cursor-pointer">
          تفعيل إشعارات البريد
        </Label>
        <Switch
          id="notif-switch"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      </div>
    </form>
  );
}
```

---

### 5.3 Overlays, Modals & Drawers

#### Dialog (Standard Modal):

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Button,
} from "@sijil/ui";

export function EditProfileModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">تعديل الملف الشخصي</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تعديل البيانات الشخصية</DialogTitle>
          <DialogDescription>
            قم بتحديث بياناتك، ثم اضغط حفظ لتطبيق التغييرات.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Your form fields */}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="ghost">إلغاء</Button>
          </DialogClose>
          <Button variant="default">حفظ التغييرات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

#### AlertDialog (Destructive Confirmations):

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Button,
} from "@sijil/ui";

export function ConfirmDelete() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">حذف السجل</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>هل أنت متأكد تماماً؟</AlertDialogTitle>
          <AlertDialogDescription>
            هذا الإجراء لا يمكن التراجع عنه وسيتم مسح كافة البيانات المسجلة نهائياً.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>تراجع</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            تأكيد الحذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

#### Sheet (Side Drawer):

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
} from "@sijil/ui";

export function FilterDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">تصفية متقدمة</Button>
      </SheetTrigger>
      {/* side="left" or "right" (auto-handles RTL) */}
      <SheetContent side="right" className="w-[320px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>خيارات التصفية</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-4">
          {/* Filter options */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

---

### 5.4 Screen Shells & Layout Primitives

`ScreenContainer` and `ScreenHeader` provide unified layout framing across all administrative and self-service pages:

```tsx
import {
  ScreenContainer,
  ScreenHeader,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
} from "@sijil/ui";
import { Download, RefreshCw } from "lucide-react";

export function AttendanceScreen() {
  return (
    <ScreenContainer className="space-y-6">
      <ScreenHeader
        title="سجل الحضور والانصراف"
        description="متابعة أوقات الحضور والانصراف والتأخير للموظفين."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
              تحديث
            </Button>
            <Button variant="default" size="sm">
              <Download className="w-4 h-4" />
              تصدير إكسل
            </Button>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>ملخص الشهر الحالي</CardTitle>
          <CardDescription>إجمالي ساعات العمل ونسب الحضور.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content */}
        </CardContent>
      </Card>
    </ScreenContainer>
  );
}
```

---

### 5.5 Navigation, Tabs & Segmented Control

#### SegmentedControl (Fast Toggle Chips):

```tsx
import { SegmentedControl } from "@sijil/ui";
import { useState } from "react";

export function ViewSwitcher() {
  const [view, setView] = useState("daily");

  return (
    <SegmentedControl
      value={view}
      onValueChange={setView}
      options={[
        { value: "daily", label: "يومي" },
        { value: "weekly", label: "أسبوعي" },
        { value: "monthly", label: "شهري" },
      ]}
    />
  );
}
```

#### MultiTabs (Scrollable / Dynamic Tab Bar):

```tsx
import { MultiTabs } from "@sijil/ui";
import { useState } from "react";

export function PolicyTabs() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <MultiTabs
      activeKey={activeTab}
      onTabChange={setActiveTab}
      items={[
        { key: "general", label: "السياسات العامة", badge: "3" },
        { key: "leaves", label: "أنواع الإجازات" },
        { key: "overtime", label: "العمل الإضافي" },
      ]}
    />
  );
}
```

---

### 5.6 Data Tables (Standard & FlexTable)

#### Standard HTML Table:

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Badge,
} from "@sijil/ui";

export function EmployeeTable({ rows }: { rows: Array<{ id: string; name: string; dept: string; status: string }> }) {
  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">الرقم</TableHead>
            <TableHead>اسم الموظف</TableHead>
            <TableHead>القسم</TableHead>
            <TableHead className="text-center">الحالة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-mono text-xs">{row.id}</TableCell>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.dept}</TableCell>
              <TableCell className="text-center">
                <Badge variant={row.status === "active" ? "success" : "secondary"}>
                  {row.status === "active" ? "نشط" : "غير نشط"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

#### Advanced FlexTable (with `@tanstack/react-table`):

```tsx
import { FlexTable } from "@sijil/ui/flex-table";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

interface RecordItem {
  id: string;
  name: string;
  hours: number;
}

const columnHelper = createColumnHelper<RecordItem>();

const columns = [
  columnHelper.accessor("id", { header: "كود" }),
  columnHelper.accessor("name", { header: "الموظف" }),
  columnHelper.accessor("hours", { header: "ساعات العمل" }),
];

export function AdvancedTableView({ data }: { data: RecordItem[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return <FlexTable table={table} />;
}
```

---

### 5.7 Date Pickers & Calendars

`@sijil/ui/date-picker` provides two-step date range selection with pre-defined shortcuts:

```tsx
import { DateRangePicker } from "@sijil/ui/date-picker";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export function FilterDateRange() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 0, 31),
  });

  return (
    <DateRangePicker
      date={dateRange}
      onDateChange={setDateRange}
      placeholder="اختر النطاق الزمني..."
      align="end"
    />
  );
}
```

---

### 5.8 Feedback, Badges & Empty States

#### EmptyState:

```tsx
import { EmptyState, Button } from "@sijil/ui";
import { FolderSearch, Plus } from "lucide-react";

export function NoDataView({ onAddNew }: { onAddNew: () => void }) {
  return (
    <EmptyState
      icon={FolderSearch}
      title="لا توجد سجلات مسجلة"
      description="لم يتم العثور على أي طلبات في هذه الفترة. يمكنك البدء بإنشاء طلب جديد."
      action={
        <Button onClick={onAddNew} size="sm">
          <Plus className="w-4 h-4" />
          طلب إجازة جديد
        </Button>
      }
    />
  );
}
```

#### Badge Variants:

```tsx
import { Badge } from "@sijil/ui";

export function StatusBadges() {
  return (
    <div className="flex gap-2">
      <Badge variant="default">أساسي</Badge>
      <Badge variant="secondary">ثانوي</Badge>
      <Badge variant="success">مقبول</Badge>
      <Badge variant="danger">مرفوض</Badge>
      <Badge variant="warning">قيد المراجعة</Badge>
      <Badge variant="outline">مسودة</Badge>
    </div>
  );
}
```

---

### 5.9 Command Palette

Quick global search and command dialog powered by `cmdk`:

```tsx
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@sijil/ui/command";
import { useState, useEffect } from "react";
import { User, Calendar, Settings } from "lucide-react";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="ابحث عن موظف، سياسة، أو أمر سريع..." />
      <CommandList>
        <CommandEmpty>لا توجد نتائج مطابقة للبحث.</CommandEmpty>
        <CommandGroup heading="روابط سريعة">
          <CommandItem onSelect={() => setOpen(false)}>
            <User className="w-4 h-4" />
            <span>ملفات الموظفين</span>
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            <Calendar className="w-4 h-4" />
            <span>جدول الإجازات</span>
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            <Settings className="w-4 h-4" />
            <span>إعدادات النظام</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
```

---

### 5.10 Charts & Metrics

Powered by `recharts` with theme-aware CSS custom property bindings:

```tsx
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@sijil/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "يناير", attendance: 95 },
  { month: "فبراير", attendance: 92 },
  { month: "مارس", attendance: 98 },
];

const chartConfig = {
  attendance: {
    label: "نسبة الحضور (%)",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function AttendanceChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="attendance" fill="var(--color-attendance, var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
```

---

## 6. Best Practices & Rules

1. **Never use inline hardcoded styles (`style={{ ... }}`):**
   Always use Tailwind utility classes or semantic design tokens (`bg-card`, `text-primary`, `border-border`).
2. **Never import translation libraries inside shared components:**
   Keep all UI components presentationally pure. If assistive text is needed, pass it via props or configure `labels` in `DesignSystemProvider`.
3. **Use the `cn()` utility for class overrides:**
   When accepting `className` in your wrapper components, always merge with `cn(defaultStyles, className)`.
4. **Use `asChild` for Router Links:**
   Never nest `<a>` tags inside `<Button>` or `<Badge>`. Use `<Button asChild><Link href="...">...</Link></Button>`.
5. **Always maintain RTL symmetry:**
   Use directional Tailwind logical classes (`start`, `end`, `ms-`, `me-`) or test directional flip on rotate icons (`rtl:rotate-180`).

---

## 7. Troubleshooting & FAQ

### Q1: Turbopack throws `Module not found: Can't resolve '@sijil/ui'`
**Cause:** In Next.js with Turbopack, packages located outside the current project root in a multi-repo structure cannot be resolved by default.  
**Fix:** In `next.config.ts`, add the Turbopack root pointing to the workspace root:
```ts
turbopack: {
  root: path.resolve(process.cwd(), "../../.."),
}
```

### Q2: TypeScript error `Type 'unique symbol' is not assignable to type 'Key'`
**Cause:** Two different versions of `@types/react` are loaded in memory by different packages.  
**Fix:** Ensure both the consuming project and the design system package specify compatible `@types/react` versions (e.g. `^19.2.14`).

### Q3: How do I change colors without modifying the design system package?
**Answer:** Simply define the variable in your application's `globals.css`:
```css
:root {
  --primary: #2563eb;
}
```
Because `@sijil/ui` targets `:where(:root[data-ds-family="sijil"])`, consumer CSS rules automatically take priority without needing `!important`.
