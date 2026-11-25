import type { Preview } from "@storybook/react";
import * as React from "react";
import "../src/index.css";
import { Button, DesignSystemProvider, ScreenContainer, ScreenFrame } from "@sijil/ui";
import { previewThemes, usePreviewTheme } from "./preview-theme";
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
        items: [...previewThemes],
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
      const { theme, nextTheme, cycleTheme } = usePreviewTheme();
      const themeValue = theme.value;
      const family = context.globals.family || DEFAULT_DESIGN_FAMILY;
      const direction = context.globals.direction || "ltr";
      const isShell = context.globals.shell === "on";
      const isScreenPage = context.parameters.screenPage === true;
      const showPreviewTheme = context.parameters.showPreviewTheme !== false;

      React.useEffect(() => {
        const root = document.documentElement;
        root.setAttribute(DESIGN_FAMILY_ATTRIBUTE, family);
        root.setAttribute("dir", direction);
        root.setAttribute("data-theme", themeValue);
        root.style.colorScheme = themeValue === "light" ? "light" : "dark";
        root.classList.remove("light", "dark", "dark-blue", "ltr", "rtl", "app-shell-mobile");
        root.classList.add(themeValue);
        root.classList.add(direction);
        if (isShell) {
          root.classList.add("app-shell-mobile");
        }
      }, [context.id, themeValue, family, direction, isShell]);

      const content = (
        <>
          {showPreviewTheme && <div className="mb-4 flex justify-end">
            <Button
              type="button"
              variant="header"
              size="sm"
              onClick={cycleTheme}
              aria-label={`Theme: ${theme.title}. Switch to ${nextTheme.title}`}
              title={`Switch to ${nextTheme.title}`}
            >
              Theme: {theme.title}
            </Button>
          </div>}
          {isScreenPage ? (
            <ScreenContainer className="px-0 shell:px-0">
              <Story />
            </ScreenContainer>
          ) : <Story />}
        </>
      );

      return (
        <DesignSystemProvider
          direction={direction}
          shell={isShell}
        >
          <div className={`min-h-screen bg-background text-foreground ${isScreenPage ? "py-6" : "p-6"}`}>
            {isScreenPage ? (
              <ScreenFrame width="full" className="px-6">
                {content}
              </ScreenFrame>
            ) : content}
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
