"use client";

import * as React from "react";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "../lib/cn.js";
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
  logoSrc?: string;
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
 * Displays application logo and names, transforming into a sidebar toggle trigger on hover.
 */
export function TeamSwitcher({
  brand,
  className,
  isCompactTrigger = false,
}: TeamSwitcherProps) {
  const direction = useDirection();
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarMenu className={className}>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          onClick={toggleSidebar}
          className="group/brand relative h-12 cursor-pointer transition-colors hover:bg-sidebar-accent"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar shadow-xs text-sidebar-foreground overflow-hidden">
            {brand.logoSrc ? (
              <img
                src={brand.logoSrc}
                alt={brand.name}
                className="size-5 object-contain group-hover/brand:hidden"
              />
            ) : brand.logoIcon ? (
              <div className="size-5 flex items-center justify-center group-hover/brand:hidden">
                {brand.logoIcon}
              </div>
            ) : null}
            <PanelLeftIcon
              className={cn(
                "size-5 transition-transform duration-200 hidden group-hover/brand:block",
                direction === "rtl" && "rotate-180",
              )}
            />
          </div>

          {!isCompactTrigger && (
            <div className="grid flex-1 text-start text-sm leading-tight truncate">
              <span className="truncate font-semibold text-foreground">{brand.name}</span>
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

