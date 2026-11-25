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

const menuItemClassName =
  "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground relative before:absolute ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-4 before:rounded-e-full before:bg-sidebar-foreground before:opacity-0 data-[state=open]:before:opacity-100 data-[state=open]:bg-transparent data-[state=open]:text-sidebar-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-foreground data-[active=true]:before:opacity-100 data-[active=true]:bg-transparent data-[active=true]:text-sidebar-foreground data-[active=true]:hover:bg-sidebar-accent data-[active=true]:hover:text-sidebar-foreground transition-all duration-150";

const collapsedMenuItemClassName =
  "text-sidebar-foreground/60 hover:bg-sidebar-accent cursor-pointer hover:text-sidebar-foreground relative before:absolute ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-4 before:rounded-e-full before:bg-sidebar-foreground before:opacity-0 data-[active=true]:before:opacity-100 data-[active=true]:bg-transparent data-[active=true]:text-sidebar-foreground data-[active=true]:hover:bg-sidebar-accent data-[active=true]:hover:text-sidebar-foreground transition-all duration-150";

/**
 * Hierarchical sidebar navigation copied from the HR app shell on `main`.
 * Parent rows keep their Lucide icons. Nested rows render titles only, matching HR `NavMain`.
 */
export function NavMain({ items, className, renderLink }: NavMainProps) {
  const { isMobile, state } = useSidebar();
  const direction = useDirection();
  const [openedCategories, setOpenedCategories] = React.useState<string[]>(() =>
    items.filter((item) => item.isActive).map((item) => item.title),
  );
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [animatingSubItem, setAnimatingSubItem] = React.useState<string | null>(null);
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

  const handleSubItemClick = (title: string) => {
    setAnimatingSubItem(title);
  };

  const handleSubItemAnimationEnd = () => {
    setAnimatingSubItem(null);
  };

  const defaultLinkRender = ({
    href,
    children,
    className: linkClassName,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={linkClassName} onClick={onClick}>
      {children}
    </a>
  );

  const LinkComponent = renderLink ?? defaultLinkRender;

  return (
    <SidebarGroup className={className}>
      <SidebarMenu className="pt-5">
        {items.map((item) => {
          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={item.isActive}
                  tooltip={item.title}
                  className={menuItemClassName}
                >
                  {LinkComponent({
                    href: item.url,
                    className: "flex items-center gap-2 w-full",
                    children: (
                      <>
                        {item.icon ? <item.icon /> : null}
                        <span className="flex-1 text-start truncate">{item.title}</span>
                      </>
                    ),
                  })}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          if (isMobile || state === "expanded") {
            return (
              <Collapsible
                key={`${item.title}-${item.isActive ? "open" : "closed"}`}
                asChild
                defaultOpen={openedCategories.includes(item.title)}
                className="group/collapsible"
                onOpenChange={(open) => {
                  if (open) {
                    setOpenedCategories((prev) => [...prev, item.title]);
                  } else {
                    setOpenedCategories((prev) => prev.filter((title) => title !== item.title));
                  }
                }}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={item.items.some((subItem) => subItem.isActive)}
                      className={menuItemClassName}
                    >
                      {item.icon ? <item.icon /> : null}
                      <span className="flex-1 text-start truncate">{item.title}</span>
                      <ChevronRight className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:group-data-[state=closed]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            className={cn(
                              "h-auto",
                              animatingSubItem === subItem.title && "animate-click-pulse-in",
                            )}
                            asChild
                            isActive={subItem.isActive}
                            onClick={() => handleSubItemClick(subItem.title)}
                            onAnimationEnd={handleSubItemAnimationEnd}
                          >
                            {LinkComponent({
                              href: subItem.url,
                              className: "py-1 flex items-center gap-2",
                              children: <span className="whitespace-normal">{subItem.title}</span>,
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

          const isSubActive = item.items.some((subItem) => subItem.isActive);
          return (
            <SidebarMenuItem key={item.title}>
              <DropdownMenu
                open={openDropdown !== null && openDropdown === item.title}
                modal={false}
              >
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    isActive={isSubActive}
                    className={collapsedMenuItemClassName}
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.icon ? <item.icon /> : null}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side={direction === "rtl" ? "left" : "right"}
                  align="start"
                  sideOffset={12}
                  className="w-44 rounded-xl bg-popover/95 backdrop-blur-md text-popover-foreground shadow-xl border border-border/40 p-2 space-y-1"
                  onMouseEnter={clearCloseTimeout}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider select-none">
                    {item.title}
                  </div>
                  {item.items.map((subItem) => (
                    <DropdownMenuItem
                      key={subItem.title}
                      asChild
                      className={cn(
                        "group/item flex items-center py-2 px-3 text-sm cursor-pointer rounded-lg transition-all duration-200",
                        subItem.isActive
                          ? "relative bg-hover-bg text-hover-text focus:bg-hover-bg focus:text-foreground focus:[background-image:none]! font-medium before:absolute ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-5 before:rounded-r-sm rtl:before:rounded-l-sm before:bg-hover-text"
                          : "text-muted-foreground hover:bg-hover-bg hover:text-foreground focus:bg-hover-bg focus:text-foreground focus:[background-image:none]!",
                      )}
                      onClick={() => handleSubItemClick(subItem.title)}
                      onAnimationEnd={handleSubItemAnimationEnd}
                    >
                      {LinkComponent({
                        href: subItem.url,
                        className: "flex items-center w-full",
                        children: (
                          <span className={cn(animatingSubItem === subItem.title && "animate-click-pulse-in")}>
                            {subItem.title}
                          </span>
                        ),
                      })}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
