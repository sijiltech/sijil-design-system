/**
 * One-shot extraction helper used during the initial migration.
 *
 * Copies the generic UI components out of the HR application (`src/shared/ui`)
 * into `packages/ui/src` and rewrites application aliases (`@/shared/...`) to
 * package-relative ESM imports (with explicit `.js` extensions). Components that
 * are coupled to application internals are edited by hand after the copy.
 *
 * Kept in the repository for traceability; it is NOT part of the build.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..", "..");
const pkgSrc = resolve(here, "..", "packages", "ui", "src");

/** Files copied verbatim (apart from import rewrites): source name -> target path. */
const COMPONENTS = [
  "accordion", "alert-dialog", "avatar", "badge", "breadcrumb", "button", "card",
  "checkbox", "collapsible", "dialog", "direction", "dropdown-menu", "empty-state",
  "field", "filters-container", "input", "label", "multi-tabs", "popover",
  "screen-container", "screen-header", "segmented-control", "select", "separator",
  "sheet", "sidebar", "skeleton", "switch", "table", "tabs", "tooltip",
  "date-picker-button", "calendar", "chart", "command", "flex-table", "date-range-picker",
];

const HOOKS = {
  "use-mobile.ts": "use-is-mobile.ts",
  "use-scroll-active-into-view.ts": "use-scroll-active-into-view.ts",
  "use-date-range-picker-state.ts": "use-date-range-picker-state.ts",
};

/**
 * Rewrites application path aliases into package-relative imports.
 *
 * @param {string} source - File contents.
 * @param {"components" | "hooks" | "lib"} kind - Folder the file is written to.
 * @returns {string} Rewritten contents.
 */
function rewrite(source, kind) {
  const up = kind === "components" ? "../" : "../";
  return source
    .replace(/from\s+["']@\/shared\/lib\/utils["']/g, `from "${up}lib/cn.js"`)
    .replace(/from\s+["']@\/shared\/ui\/([a-z-]+)["']/g, 'from "./$1.js"')
    .replace(/from\s+["']\.\/(table)["']/g, 'from "./$1.js"')
    .replace(/from\s+["']@\/shared\/hooks\/use-mobile["']/g, `from "${up}hooks/use-is-mobile.js"`)
    .replace(/from\s+["']@\/shared\/hooks\/use-scroll-active-into-view["']/g, `from "${up}hooks/use-scroll-active-into-view.js"`)
    .replace(/from\s+["']@\/shared\/hooks\/use-date-range-picker-state["']/g, `from "${up}hooks/use-date-range-picker-state.js"`)
    .replace(/from\s+["']@\/shared\/lib\/date\/date-range-helper["']/g, `from "${up}lib/date-range-helper.js"`);
}

for (const name of COMPONENTS) {
  const from = join(appRoot, "src", "shared", "ui", `${name}.tsx`);
  const to = join(pkgSrc, "components", `${name}.tsx`);
  mkdirSync(dirname(to), { recursive: true });
  writeFileSync(to, rewrite(readFileSync(from, "utf8"), "components"));
}

for (const [src, dest] of Object.entries(HOOKS)) {
  const from = join(appRoot, "src", "shared", "hooks", src);
  const to = join(pkgSrc, "hooks", dest);
  mkdirSync(dirname(to), { recursive: true });
  writeFileSync(to, rewrite(readFileSync(from, "utf8"), "hooks"));
}

mkdirSync(join(pkgSrc, "lib"), { recursive: true });
copyFileSync(
  join(appRoot, "src", "shared", "lib", "date", "date-range-helper.ts"),
  join(pkgSrc, "lib", "date-range-helper.ts"),
);

console.log("extracted", COMPONENTS.length, "components");

