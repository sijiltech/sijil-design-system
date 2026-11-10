/**
 * Guards `npm publish` against accidentally pushing this private package to the
 * public npm registry. Publishing is only allowed when the registry resolved for
 * the `@sijil` scope is NOT the public npm registry.
 *
 * Registry resolution order (first match wins):
 *   1. `npm_config_@sijil:registry` (scoped registry from `.npmrc`)
 *   2. `npm_config_registry`
 *   3. `publishConfig.registry` from package.json
 */
import { readFileSync } from "node:fs";

const PUBLIC_REGISTRY_PATTERN = /registry\.npmjs\.org|registry\.yarnpkg\.com/i;

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const registry =
  process.env["npm_config_@sijil:registry"] ??
  process.env.npm_config_registry ??
  pkg.publishConfig?.registry ??
  "https://registry.npmjs.org/";

if (PUBLIC_REGISTRY_PATTERN.test(registry)) {
  console.error(
    `\n[assert-private-registry] Refusing to publish ${pkg.name}: resolved registry is "${registry}".\n` +
      `Configure a private registry first, e.g. in .npmrc:\n` +
      `  @sijil:registry=https://<your-private-registry>/\n`,
  );
  process.exit(1);
}

console.log(`[assert-private-registry] Publishing ${pkg.name}@${pkg.version} to ${registry}`);

