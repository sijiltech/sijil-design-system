import type { Preview } from "@storybook/react";
import * as React from "react";
import "../src/index.css";
import {
  DesignSystemProvider,
  DirectionProvider,
} from "@sijil/ui";
import {
  DESIGN_FAMILY_ATTRIBUTE,
  DEFAULT_DESIGN_FAMILY,
  designFamilies,
} from "@sijil/ui/families";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Color theme for the active family",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "dark-blue", title: "Dark Blue", icon: "contrast" },
        ],
        showName: true,
      },
    },
    family: {
      name: "Design Family",
      description: "Visual design family",
      defaultValue: DEFAULT_DESIGN_FAMILY,
      toolbar: {
        icon: "component",
        items: designFamilies.map((f) => ({
          value: f.id,
          title: f.label,
        })),
        showName: true,
      },
    },
    direction: {
      name: "Direction",
      description: "Reading direction (LTR / RTL)",
      defaultValue: "ltr",
      toolbar: {
        icon: "globe",
        items: [
          { value: "ltr", title: "LTR (Left to Right)" },
          { value: "rtl", title: "RTL (Arabic)" },
        ],
        showName: true,
      },
    },
    shell: {
      name: "Touch Shell",
      description: "Mobile touch shell viewport mode",
      defaultValue: "off",
      toolbar: {
        icon: "mobile",
        items: [
          { value: "off", title: "Desktop shell" },
          { value: "on", title: "Mobile shell" },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";
      const family = context.globals.family || DEFAULT_DESIGN_FAMILY;
      const direction = context.globals.direction || "ltr";
      const isShell = context.globals.shell === "on";

      React.useEffect(() => {
        const root = document.documentElement;
        root.setAttribute(DESIGN_FAMILY_ATTRIBUTE, family);
        root.setAttribute("dir", direction);
        root.classList.remove("light", "dark", "dark-blue", "ltr", "rtl", "app-shell-mobile");
        root.classList.add(theme);
        root.classList.add(direction);
        if (isShell) {
          root.classList.add("app-shell-mobile");
        }
      }, [theme, family, direction, isShell]);

      return (
        <DesignSystemProvider
          direction={direction}
          shell={isShell}
        >
          <div className="min-h-screen bg-background text-foreground p-6">
            <Story />
          </div>
        </DesignSystemProvider>
      );
    },
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: { disable: true },
  },
};

export default preview;
