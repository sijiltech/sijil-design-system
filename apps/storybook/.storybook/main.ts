import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

const uiPkg = resolve(__dirname, "../../../packages/ui");

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(viteConfig) {
    viteConfig.plugins = viteConfig.plugins || [];
    viteConfig.plugins.push(tailwindcss());

    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      "@sijil/ui/theme.css": resolve(uiPkg, "styles/theme.css"),
      "@sijil/ui/families/sijil.css": resolve(uiPkg, "styles/families/sijil/index.css"),
      "@sijil/ui/calendar": resolve(uiPkg, "src/calendar.ts"),
      "@sijil/ui/chart": resolve(uiPkg, "src/chart.ts"),
      "@sijil/ui/command": resolve(uiPkg, "src/command.ts"),
      "@sijil/ui/date-picker": resolve(uiPkg, "src/date-picker.ts"),
      "@sijil/ui/flex-table": resolve(uiPkg, "src/flex-table.ts"),
      "@sijil/ui/families": resolve(uiPkg, "src/families.ts"),
      "@sijil/ui": resolve(uiPkg, "src/index.ts"),
    };
    return viteConfig;
  },
};

export default config;
