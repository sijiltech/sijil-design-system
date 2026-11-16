"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "dark-blue" | "system";
export type ResolvedTheme = "light" | "dark" | "dark-blue";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
}

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const isTheme = (value: unknown): value is Theme =>
  value === "light" || value === "dark" || value === "dark-blue" || value === "system";

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const resolveTheme = (theme: Theme): ResolvedTheme =>
  theme === "system" ? getSystemTheme() : theme;

const TRANSITION_DISABLE_ID = "sijil-theme-transition-disable";

/**
 * Temporarily disables all CSS transitions during theme changes to prevent
 * lagging components (fade/transition delay) while the page background snaps.
 */
const disableTransitions = () => {
  if (typeof document === "undefined") return () => { };

  const root = document.documentElement;
  root.setAttribute("data-theme-switching", "true");

  let css = document.getElementById(TRANSITION_DISABLE_ID) as HTMLStyleElement | null;
  if (!css) {
    css = document.createElement("style");
    css.id = TRANSITION_DISABLE_ID;
    css.textContent = `
      html[data-theme-switching],
      html[data-theme-switching] *,
      html[data-theme-switching] *::before,
      html[data-theme-switching] *::after,
      :root[data-theme-switching],
      :root[data-theme-switching] *,
      :root[data-theme-switching] *::before,
      :root[data-theme-switching] *::after,
      *, *::before, *::after {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
        animation: none !important;
        animation-duration: 0s !important;
      }
    `;
    document.head.appendChild(css);
  }

  return () => {
    // Force a full style and layout flush so the browser evaluates new theme variables immediately without transitions
    if (typeof window !== "undefined") {
      void document.body.offsetHeight;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.removeAttribute("data-theme-switching");
          const el = document.getElementById(TRANSITION_DISABLE_ID);
          if (el) {
            el.remove();
          }
        });
      });
    }
  };
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "sijil-ui-theme",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored && isTheme(stored)) return stored;
    } catch {
      // ignore localStorage errors
    }
    return defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(() =>
    resolveTheme(defaultTheme),
  );

  const applyTheme = React.useCallback(
    (nextTheme: Theme) => {
      if (typeof window === "undefined") return;
      const root = window.document.documentElement;
      const resolved = resolveTheme(nextTheme);

      const enableTransitions = disableTransitions();

      root.classList.remove("light", "dark", "dark-blue");
      root.classList.add(resolved);
      root.setAttribute("data-theme", resolved);
      root.style.colorScheme = resolved === "light" ? "light" : "dark";

      enableTransitions();

      setResolvedTheme(resolved);
    },
    [],
  );

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      try {
        window.localStorage.setItem(storageKey, newTheme);
      } catch {
        // ignore
      }
      setThemeState(newTheme);
      applyTheme(newTheme);
    },
    [applyTheme, storageKey],
  );

  const toggleTheme = React.useCallback(() => {
    const cycle: Record<ResolvedTheme, ResolvedTheme> = {
      light: "dark",
      dark: "dark-blue",
      "dark-blue": "light",
    };
    const next = cycle[resolvedTheme] || "light";
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  // Initial client sync & storage listener
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored && isTheme(stored)) {
        setThemeState(stored);
        applyTheme(stored);
      } else {
        applyTheme(theme);
      }
    } catch {
      applyTheme(theme);
    }
  }, [applyTheme, storageKey, theme]);

  // System theme changes
  React.useEffect(() => {
    if (!enableSystem || theme !== "system" || typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      applyTheme("system");
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [applyTheme, enableSystem, theme]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) {
    // Graceful fallback if used outside ThemeProvider
    return {
      theme: "light",
      resolvedTheme: "light",
      setTheme: () => { },
      toggleTheme: () => { },
    };
  }
  return context;
}

