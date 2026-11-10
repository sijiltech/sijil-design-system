import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  COLOR_TOKENS,
  STATUS_TOKENS,
  SHADOW_TOKENS,
} from "@sijil/ui/families";

const meta: Meta = {
  title: "Design Tokens/Overview",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Palette: StoryObj = {
  render: () => {
    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Design Tokens</h1>
          <p className="text-muted-foreground">
            Semantic design tokens defined by the active design family. Toggle the theme (light, dark, dark-blue)
            in the toolbar above to preview token values dynamically.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Core Surface & Brand Colors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {COLOR_TOKENS.slice(0, 16).map((token) => (
              <div
                key={token}
                className="rounded-xl border border-input p-3 bg-card shadow-sm space-y-2"
              >
                <div
                  className="h-12 w-full rounded-lg border border-border"
                  style={{ backgroundColor: `var(--${token})` }}
                />
                <div className="text-xs font-mono font-medium truncate">--{token}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Status & Feedback Tokens</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-success-border bg-success-light text-success-text">
              <div className="font-semibold text-sm">Success</div>
              <div className="text-xs opacity-80 mt-1 font-mono">--color-success</div>
            </div>
            <div className="p-4 rounded-xl border border-danger-border bg-danger-light text-danger-text">
              <div className="font-semibold text-sm">Danger / Destructive</div>
              <div className="text-xs opacity-80 mt-1 font-mono">--color-danger</div>
            </div>
            <div className="p-4 rounded-xl border border-warning-border bg-warning-light text-warning-text">
              <div className="font-semibold text-sm">Warning</div>
              <div className="text-xs opacity-80 mt-1 font-mono">--color-warning</div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-muted text-foreground">
              <div className="font-semibold text-sm">Info / Muted</div>
              <div className="text-xs opacity-80 mt-1 font-mono">--color-info</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Elevation & Shadows</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {SHADOW_TOKENS.map((shadow) => (
              <div
                key={shadow}
                className="h-24 rounded-2xl bg-card border border-border flex items-center justify-center font-mono text-xs font-medium"
                style={{ boxShadow: `var(--${shadow})` }}
              >
                --{shadow}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
