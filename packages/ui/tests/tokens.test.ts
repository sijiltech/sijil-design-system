import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
  COLOR_TOKENS,
  FAMILY_TOKENS,
  INTERACTIVE_TOKENS,
  SHADOW_TOKENS,
  STATUS_TOKENS,
  THEMED_TOKENS,
} from "../src/families.js";

const tokensCssPath = resolve(__dirname, "../styles/families/sijil/tokens.css");
const tokensCss = readFileSync(tokensCssPath, "utf-8");

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
});

