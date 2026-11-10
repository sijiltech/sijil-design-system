import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const root = "E:/dev/react/hr-frontend/hr_sijil_target/sijil_hr";
const globalsPath = `${root}/src/app/globals.css`;
const outDir = `${root}/design-system/packages/ui/styles/families/sijil`;
const original = readFileSync(`${root}/design-system/scripts/globals.original.css`, "utf8").replace(/\r\n/g, "\n");
const L = original.split("\n");

/** 1-indexed inclusive slice. */
const range = (a, b) => L.slice(a - 1, b).join("\n");

const SCOPE = ':where(:root[data-ds-family="sijil"])';

const DOMAIN_VAR = /^\s*--(attendance-|accent-(green|orange|yellow|purple)|color-metric-|muted2)/;
const DOMAIN_COMMENT = /\/\*.*(metric|leave balance|attendance).*\*\//i;

/** Splits a token block body into [familyLines, domainLines]. */
function splitBlock(startLine, endLine) {
  const body = L.slice(startLine, endLine - 1); // exclude the selector line and the closing brace
  const family = [];
  const domain = [];
  for (const line of body) {
    if (DOMAIN_VAR.test(line) || DOMAIN_COMMENT.test(line)) domain.push(line);
    else family.push(line);
  }
  return [family, domain];
}

/** Collapses runs of blank lines and trims the edges. */
const tidy = (lines) =>
  lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\n+|\n+$/g, "");

const [lightFam, lightDom] = splitBlock(307, 442);
const [darkFam, darkDom] = splitBlock(444, 564);
const [blueFam, blueDom] = splitBlock(566, 698);

// ─── Family tokens ──────────────────────────────────────────────────────────
const structural = `  /* Structural tokens (theme independent) */
  --control-h-xs: 1.75rem;
  --control-h-sm: 2rem;
  --control-h-md: 2.25rem;
  --control-h-lg: 2.5rem;
  --ds-font-sans: var(--font-roboto, "Roboto", ui-sans-serif, system-ui, sans-serif);
`;

const tokens = `/*
 * Sijil design family — design tokens.
 *
 * Defines every token of the semantic contract (see \`src/tokens/contract.ts\`)
 * for the three themes of this family: light (default), \`.dark\` and
 * \`.dark-blue\`. Selectors are wrapped in \`:where()\` so that they have zero
 * specificity: a consuming project can override any token with a plain
 * \`:root { --primary: ... }\` / \`.dark { ... }\` rule declared after this file.
 */

${SCOPE} {
${structural}
${tidy(lightFam)}
}

${SCOPE}.dark {
${tidy(darkFam)}
}

${SCOPE}.dark-blue {
${tidy(blueFam)}
}
`;

// ─── Family base (slot styles, scrollbars, hover treatments) ────────────────

/** Prefixes every top-level rule's selectors with the family scope (comments are preserved verbatim). */
function scopeRules(css) {
  let out = "";
  let i = 0;
  let selector = "";
  let depth = 0;
  while (i < css.length) {
    if (depth === 0 && css.startsWith("/*", i)) {
      const close = css.indexOf("*/", i) + 2;
      out += css.slice(i, close);
      i = close;
      continue;
    }
    const ch = css[i];
    if (depth === 0) {
      if (ch === "{") {
        const parts = [];
        let cur = "";
        let paren = 0;
        for (const c of selector) {
          if (c === "(") paren++;
          if (c === ")") paren--;
          if (c === "," && paren === 0) {
            parts.push(cur);
            cur = "";
          } else cur += c;
        }
        parts.push(cur);
        out +=
          parts
            .flatMap((p) => {
              const sel = p.trim();
              // `::pseudo` selectors must also match the root element itself.
              return sel.startsWith("::") ? [`${SCOPE}${sel}`, `${SCOPE} ${sel}`] : [`${SCOPE} ${sel}`];
            })
            .join(",\n") + " {";
        selector = "";
        depth = 1;
      } else if (selector.trim() === "" && /\s/.test(ch)) {
        out += ch;
      } else {
        selector += ch;
      }
    } else {
      out += ch;
      if (ch === "{") depth++;
      if (ch === "}") depth--;
    }
    i++;
  }
  return out;
}
const baseLayer = scopeRules(
  [range(701, 703), range(736, 741), range(751, 787), range(802, 824)].join("\n\n"),
);

const bodyRules = `${SCOPE}.dark body {
  background-image: linear-gradient(180deg, #000000, #000000);
}

${SCOPE}.dark-blue body {
  background-image: linear-gradient(180deg, var(--background), #0a111e);
}`;

const unlayered = scopeRules(
  [range(907, 1006), range(1659, 1697), range(1820, 1825)].join("\n\n"),
);

const utilities = [range(829, 848)].join("\n");

const base = `/*
 * Sijil design family — slot styles.
 *
 * Presentation rules that target the stable \`data-slot\` attributes emitted by
 * the components (card, dialog, popover, inputs, tabs, calendar days...).
 * Every rule is scoped to \`:root[data-ds-family="sijil"]\` through a
 * zero-specificity \`:where()\`, so a second family can ship different rules
 * without colliding with these.
 *
 * NOTE: the unlayered section intentionally stays outside any \`@layer\`: it
 * preserves the cascade precedence the original application stylesheet had
 * relative to Tailwind utilities (including their \`!important\` variants).
 */

@layer base {
${baseLayer}

${bodyRules}
}

@layer utilities {
${utilities}
}

${unlayered}
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/tokens.css`, tokens);
writeFileSync(`${outDir}/base.css`, base);
writeFileSync(
  `${outDir}/index.css`,
  `/* Sijil design family: tokens + slot styles. */\n@import "./tokens.css";\n@import "./base.css";\n`,
);

// ─── Application stylesheet (domain tokens only + app-specific rules) ───────
const appTheme = `@theme inline {
  --font-roboto: "Roboto", sans-serif;
  --font-amiri: "Amiri", serif;
  --font-aref-ruqaa: "Aref Ruqaa", serif;
  --font-funnel-sans: "Funnel Sans", sans-serif;
  --font-ibm-plex-sans-arabic: "IBM Plex Sans Arabic", sans-serif;
  --font-pontano-sans: "Pontano Sans", sans-serif;
  --font-racing-sans-one: "Racing Sans One", sans-serif;
  --font-tajawal: Tajawal, sans-serif;
${range(66, 67)}
${range(70, 72)}

  --color-metric-good: var(--color-metric-good);
  --color-metric-moderate: var(--color-metric-moderate);
  --color-metric-poor: var(--color-metric-poor);

${range(100, 109)}`;

const domainBlock = (selector, lines) => `${selector} {\n${tidy(lines)}\n}`;

const appBase = `@layer base {
${range(705, 734)}

${range(789, 800)}
}`;

const appUtilities = `@layer utilities {
${range(850, 862)}

${range(874, 881)}
}`;

const app = [
  `@import "tailwindcss";`,
  `@import "@sijil/ui/theme.css";`,
  `@import "@sijil/ui/families/sijil.css";`,
  ``,
  appTheme,
  ``,
  range(147, 161),
  ``,
  range(187, 198),
  ``,
  range(200, 305),
  ``,
  `/* Application domain tokens (attendance heatmap, leave balance accents, metrics).`,
  `   Generic design tokens live in the design system: @sijil/ui/families/sijil.css */`,
  domainBlock(":root", lightDom),
  ``,
  domainBlock(".dark", darkDom),
  ``,
  domainBlock(".dark-blue", blueDom),
  ``,
  appBase,
  ``,
  appUtilities,
  ``,
  range(885, 905),
  ``,
  range(1008, 1657),
  ``,
  range(1699, 1818),
  ``,
].join("\n");

writeFileSync(globalsPath, app.replace(/\n{3,}/g, "\n\n"));
console.log("family css + app globals.css written");
