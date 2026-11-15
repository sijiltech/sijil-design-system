"use client";

import * as React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "../lib/cn.js";
import { useDirection } from "./direction.js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu.js";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "./sidebar.js";

export interface NavMainSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavMainSubItem[];
}

export interface NavMainProps {
  items: NavMainItem[];
  className?: string;
  /** Custom link renderer (e.g. Next.js Link or react-router Link). Defaults to <a>. */
  renderLink?: (props: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => React.ReactNode;
}

/**
 * Standard hierarchical navigation menu for the Sidebar.
 * Features collapsible groups, active route highlighting, smooth chevron transitions,
 * and a floating flyout dropdown menu when the sidebar is collapsed in icon mode.
 */
export function NavMain({ items, className, renderLink }: NavMainProps) {
  const { isMobile, state } = useSidebar();
  const direction = useDirection();
  const [openedCategories, setOpenedCategories] = React.useState<string[]>(() =>
    items.filter((item) => item.isActive).map((item) => item.title),
  );
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleMouseEnter = (title: string) => {
    clearCloseTimeout();
    setOpenDropdown(title);
  };

  const handleMouseLeave = () => {
    scheduleClose();
  };

  const isCollapsed = state === "collapsed" && !isMobile;

  const defaultLinkRender = ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );

  const LinkComponent = renderLink ?? defaultLinkRender;

  return (
    <SidebarGroup className={cn("px-2 py-0", className)}>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = Boolean(item.items && item.items.length > 0);
          const Icon = item.icon;

          if (isCollapsed && hasChildren) {
            return (
              <SidebarMenuItem
                key={item.title}
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <DropdownMenu
                  open={openDropdown === item.title}
                  onOpenChange={(open) => {
                    if (open) {
                      clearCloseTimeout();
                      setOpenDropdown(item.title);
                    } else {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.isActive}
                      className={cn(
                        "cursor-pointer",
                        item.isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                      )}
                    >
                      {Icon && <Icon className="size-4 shrink-0" />}
                      <span className="truncate">{item.title}</span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side={direction === "rtl" ? "left" : "right"}
                    align="start"
                    className="w-52 p-1.5 shadow-lg bg-popover"
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                      {item.title}
                    </div>
                    {item.items?.map((subItem) => (
                      <DropdownMenuItem key={subItem.title} asChild>
                        {LinkComponent({
                          href: subItem.url,
                          className: cn(
                            "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer",
                            subItem.isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                          ),
                          children: (
                            <>
                              {subItem.icon && <subItem.icon className="size-4 shrink-0" />}
                              <span>{subItem.title}</span>
                            </>
                          ),
                        })}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          }

          if (hasChildren) {
            const isCategoryOpen = openedCategories.includes(item.title);

            return (
              <Collapsible
                key={item.title}
                asChild
                open={isCategoryOpen}
                onOpenChange={(isOpen) => {
                  setOpenedCategories((prev) =>
                    isOpen ? [...prev, item.title] : prev.filter((t) => t !== item.title),
                  );
                }}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.isActive}
                      className={cn(
                        "cursor-pointer",
                        item.isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                      )}
                    >
                      {Icon && <Icon className="size-4 shrink-0" />}
                      <span className="truncate">{item.title}</span>
                      <ChevronRight
                        className={cn(
                          "ltr:ml-auto rtl:mr-auto size-4 shrink-0 transition-transform duration-200",
                          "group-data-[state=open]/collapsible:rotate-90",
                          direction === "rtl" && "rotate-180 group-data-[state=open]/collapsible:rotate-90",
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="ltr:ml-3 rtl:mr-3 border-sidebar-border">
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                            {LinkComponent({
                              href: subItem.url,
                              children: (
                                <>
                                  {subItem.icon && <subItem.icon className="size-3.5 shrink-0" />}
                                  <span>{subItem.title}</span>
                                </>
                              ),
                            })}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                {LinkComponent({
                  href: item.url,
                  children: (
                    <>
                      {Icon && <Icon className="size-4 shrink-0" />}
                      <span className="truncate">{item.title}</span>
                    </>
                  ),
                })}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

