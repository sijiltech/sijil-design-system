/**
 * Accessible, screen-reader and tooltip strings used internally by components.
 *
 * The design system never imports an i18n library. Consumers translate these
 * strings (with whatever i18n solution they use) and pass them to
 * {@link DesignSystemProvider}. Every key falls back to the English default.
 */
export interface DesignSystemLabels {
  /** Screen-reader label of the close button in dialogs and sheets. */
  close: string;
  /** Screen-reader label of the breadcrumb "more" (ellipsis) item. */
  more: string;
  /** Default accessible title of the command palette dialog. */
  commandPaletteTitle: string;
  /** Default accessible description of the command palette dialog. */
  commandPaletteDescription: string;
  /** Text rendered by `FlexTable` when there are no rows. */
  noResults: string;
  /** Accessible title of the mobile sidebar sheet. */
  sidebarTitle: string;
  /** Accessible description of the mobile sidebar sheet. */
  sidebarDescription: string;
  /** Label/title of the sidebar toggle controls. */
  sidebarToggle: string;
}

/** English fallback used when no provider (or no override) is supplied. */
export const defaultDesignSystemLabels: DesignSystemLabels = {
  close: "Close",
  more: "More",
  commandPaletteTitle: "Command Palette",
  commandPaletteDescription: "Search for a command to run...",
  noResults: "No results.",
  sidebarTitle: "Sidebar",
  sidebarDescription: "Displays the mobile sidebar.",
  sidebarToggle: "Toggle Sidebar",
};

