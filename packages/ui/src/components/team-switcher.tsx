"use client";

import * as React from "react";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "../lib/cn.js";
import { useDesignSystem } from "../provider/use-design-system.js";
import { useDirection } from "./direction.js";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./sidebar.js";

export interface SidebarBrandData {
  name: string;
  subtitle?: string;
  /** App-provided logo image URL. */
  logoSrc?: string;
  /** App-provided React icon or fallback for an unavailable logo image. */
  logoIcon?: React.ReactNode;
  href?: string;
}

export interface TeamSwitcherProps {
  brand: SidebarBrandData;
  className?: string;
  isCompactTrigger?: boolean;
}

/**
 * Standard brand/team header placed at the top of the Sidebar.
 * Swaps the application logo for the sidebar toggle icon on hover and keyboard focus.
 */
export function TeamSwitcher({
  brand,
  className,
  isCompactTrigger = false,
}: TeamSwitcherProps) {
  const direction = useDirection();
  const { labels } = useDesignSystem();
  const { isMobile, open, openMobile, toggleSidebar } = useSidebar();
  const [failedLogoSrc, setFailedLogoSrc] = React.useState<string>();
  const logoSrc = brand.logoSrc !== failedLogoSrc ? brand.logoSrc : undefined;
  const hasLogo = Boolean(logoSrc || brand.logoIcon);

  return (
    <SidebarMenu className={className}>
      <SidebarMenuItem>
        <SidebarMenuButton
          type="button"
          size="lg"
          tooltip={labels.sidebarToggle}
          aria-label={labels.sidebarToggle}
          aria-expanded={isMobile ? openMobile : open}
          onClick={toggleSidebar}
          className="cursor-pointer group/logo-toggle"
        >
          {hasLogo ? (
            <div
              data-slot="sidebar-brand-mark"
              className="relative flex size-8 shrink-0 items-center justify-center border-2 border-primary rounded-lg shadow-sm overflow-hidden text-sidebar-primary-foreground dark:bg-white dark:text-black transition-all duration-300 ease-in-out group-hover/logo-toggle:border-transparent group-hover/logo-toggle:shadow-none group-hover/logo-toggle:bg-transparent dark:group-hover/logo-toggle:bg-transparent"
            >
              {logoSrc ? (
                <img
                  data-slot="sidebar-brand-logo"
                  src={logoSrc}
                  width={64}
                  height={64}
                  alt=""
                  onError={() => setFailedLogoSrc(logoSrc)}
                  className="size-8 object-cover transition-all duration-300 ease-in-out group-hover/logo-toggle:scale-0 group-hover/logo-toggle:opacity-0 group-hover/logo-toggle:rotate-90 opacity-100 scale-100 rotate-0"
                />
              ) : (
                <div
                  data-slot="sidebar-brand-logo"
                  aria-hidden="true"
                  className="flex size-8 items-center justify-center transition-all duration-300 ease-in-out group-hover/logo-toggle:scale-0 group-hover/logo-toggle:opacity-0 group-hover/logo-toggle:rotate-90 opacity-100 scale-100 rotate-0"
                >
                  {brand.logoIcon}
                </div>
              )}
              <PanelLeftIcon
                aria-hidden="true"
                data-slot="sidebar-brand-toggle-icon"
                className={cn(
                  "absolute size-5 text-sidebar-foreground dark:text-white transition-all duration-300 ease-in-out group-hover/logo-toggle:scale-100 group-hover/logo-toggle:opacity-100 group-hover/logo-toggle:rotate-0 opacity-0 scale-0 -rotate-90",
                  direction === "rtl" && "rotate-180 group-hover/logo-toggle:rotate-180",
                )}
              />
            </div>
          ) : (
            <div
              data-slot="sidebar-brand-mark"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar shadow-xs text-sidebar-foreground"
            >
              <PanelLeftIcon
                aria-hidden="true"
                data-slot="sidebar-brand-toggle-icon"
                className={cn(
                  "size-5 transition-transform duration-200",
                  direction === "rtl" && "rotate-180",
                )}
              />
            </div>
          )}

          {!isCompactTrigger && (
            <div className="grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-semibold">{brand.name}</span>
              {brand.subtitle && (
                <span className="truncate text-xs text-muted-foreground">{brand.subtitle}</span>
              )}
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export { TeamSwitcher as SidebarBrand };

