import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { compile } from "@tailwindcss/node";
import { describe, expect, it } from "vitest";

import {
  COLOR_TOKENS,
  FAMILY_TOKENS,
  INTERACTIVE_TOKENS,
  SHADOW_TOKENS,
  STATUS_TOKENS,
} from "../src/families.js";

const tokensCss = [
  "../../theme/styles/theme.css",
  "../../theme/styles/sijil.css",
  "../styles/families/sijil/tokens.css",
].map((path) => readFileSync(resolve(__dirname, path), "utf-8")).join("\n");

describe("Design Token Contract Validation", () => {
  it("defines all structural family tokens in the base selector", () => {
    for (const token of FAMILY_TOKENS) {
      expect(tokensCss).toContain(`--${token}:`);
    }
  });

  it("defines all color tokens", () => {
    for (const token of COLOR_TOKENS) {
      expect(tokensCss).toContain(`--${token}:`);
    }
  });

  it("defines all interactive state tokens", () => {
    for (const token of INTERACTIVE_TOKENS) {
      expect(tokensCss).toContain(`--${token}:`);
    }
  });

  it("defines all status tokens", () => {
    for (const token of STATUS_TOKENS) {
      expect(tokensCss).toContain(`--${token}:`);
    }
  });

  it("defines all shadow elevation tokens", () => {
    for (const token of SHADOW_TOKENS) {
      expect(tokensCss).toContain(`--${token}:`);
    }
  });

  it("contains rules for .dark and .dark-blue themes", () => {
    expect(tokensCss).toContain(".dark {");
    expect(tokensCss).toContain(".dark-blue {");
  });

  it("sets distinct separator colors and elevation values for each palette", () => {
    const paletteCss = readFileSync(resolve(__dirname, "../../theme/styles/sijil.css"), "utf-8");
    const palettes = [...paletteCss.matchAll(/{([^{}]+)}/g)].map((match) => match[1]);
    expect(palettes).toHaveLength(3);

    for (const token of ["separator", ...SHADOW_TOKENS]) {
      const values = palettes.map((palette) => palette.match(new RegExp("--" + token + ": ([^;]+);"))?.[1]);
      expect(values).not.toContain(undefined);
      expect(new Set(values).size).toBe(palettes.length);
    }
  });
});

describe("Shared Tailwind theme", () => {
  it("generates standalone utilities that read the active palette", async () => {
    const compiler = await compile(
      [
        '@import "tailwindcss";',
        '@import "@sijil/theme/theme.css";',
        '@import "@sijil/theme/sijil.css";',
      ].join("\n"),
      { base: resolve(__dirname, ".."), onDependency() {} },
    );
    const css = compiler.build([
      "bg-primary",
      "text-success",
      "font-sans",
      "rounded-2xl",
      "border-separator",
      "bg-separator",
      "shadow",
      ...SHADOW_TOKENS,
      "transition-colors",
      "bg-sidebar",
      "animate-accordion-down",
    ]);

    expect(css).toContain("background-color: var(--primary)");
    expect(css).toContain("color: var(--color-success)");
    expect(css).toContain("font-family: var(--font-sans)");
    expect(css).toContain("border-radius: var(--radius-2xl)");
    expect(css).toContain("border-color: var(--separator)");
    expect(css).toContain("background-color: var(--separator)");
    for (const token of SHADOW_TOKENS) {
      expect(css).toContain("--tw-shadow: var(--" + token + ")");
    }
    expect(css.match(/\.shadow\s*\{([^}]*)\}/)?.[1]).toContain("--tw-shadow: var(--shadow-sm)");
    expect(css).toContain("var(--default-transition-duration)");
    expect(css).not.toContain(".bg-sidebar");
    expect(css).not.toContain(".animate-accordion-down");
    expect(compiler.sources).toHaveLength(0);
  });
});
