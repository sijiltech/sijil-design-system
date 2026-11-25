import { useGlobals } from "@storybook/preview-api";

export const previewThemes = [
  { value: "light", title: "Light", icon: "sun" },
  { value: "dark", title: "Dark", icon: "moon" },
  { value: "dark-blue", title: "Dark Blue", icon: "contrast" },
] as const;

export function usePreviewTheme() {
  const [globals, updateGlobals] = useGlobals();
  const index = Math.max(0, previewThemes.findIndex(({ value }) => value === globals.theme));
  const theme = previewThemes[index];
  const nextTheme = previewThemes[(index + 1) % previewThemes.length];

  return {
    theme,
    nextTheme,
    cycleTheme: () => updateGlobals({ theme: nextTheme.value }),
  };
}
