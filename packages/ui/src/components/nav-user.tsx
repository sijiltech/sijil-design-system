"use client";

import * as React from "react";
import { BadgeCheck, ChevronsUpDown, LogOut, UserCircle } from "lucide-react";
import { cn } from "../lib/cn.js";
import { useDirection } from "./direction.js";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu.js";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./sidebar.js";

export interface NavUserData {
  name: string;
  email?: string;
  avatar?: string;
  initials?: string;
}

export interface NavUserProps {
  user: NavUserData;
  onProfileClick?: () => void;
  profileLink?: React.ReactNode;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  labels?: {
    profile?: string;
    settings?: string;
    logout?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

/**
 * Standard user account menu button placed in the Sidebar footer.
 * Features user avatar, initials fallback, details popover, and customizable actions.
 */
export function NavUser({
  user,
  onProfileClick,
  profileLink,
  onSettingsClick,
  onLogoutClick,
  labels,
  className,
  children,
}: NavUserProps) {
  const { isMobile } = useSidebar();
  const direction = useDirection();
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const initials =
    user.initials ??
    user.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <SidebarMenu className={className}>
      <SidebarMenuItem>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              variant="outline"
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Avatar className="h-8 w-8 rounded-lg cursor-pointer shadow-xl">
                {user.avatar && <AvatarImage className="bg-white" src={user.avatar} alt={user.name} />}
                <AvatarFallback className="rounded-lg bg-card border-2 border-primary text-primary text-sm font-bold dark:bg-white dark:text-black">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {user.email && <span className="truncate text-sm">{user.email}</span>}
              </div>
              <ChevronsUpDown className="ltr:ml-auto rtl:mr-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-44 rounded-xl bg-popover/95 backdrop-blur-md text-popover-foreground shadow-xl border border-border/40 p-2 space-y-1"
            side={isMobile ? "bottom" : direction === "rtl" ? "left" : "right"}
            align="start"
            sideOffset={12}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-3 py-2 text-start text-sm">
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  {user.email && (
                    <span className="truncate text-sm text-muted-foreground">{user.email}</span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            {(children || profileLink || onProfileClick || onSettingsClick || onLogoutClick) && (
              <DropdownMenuSeparator className="bg-border/40" />
            )}

            {children ? (
              children
            ) : (
              <>
                <DropdownMenuGroup>
                  {profileLink ?? (onProfileClick && (
                    <DropdownMenuItem
                      onClick={onProfileClick}
                      className="flex items-center gap-2 py-2 px-3 text-sm cursor-pointer rounded-lg transition-all duration-200 text-muted-foreground hover:bg-hover-bg hover:text-foreground focus:bg-hover-bg focus:text-foreground"
                    >
                      <UserCircle />
                      {labels?.profile ?? "Profile"}
                    </DropdownMenuItem>
                  ))}
                  {onSettingsClick && (
                    <DropdownMenuItem
                      onClick={onSettingsClick}
                      className="flex items-center gap-2 py-2 px-3 text-sm cursor-pointer rounded-lg transition-all duration-200 text-muted-foreground hover:bg-hover-bg hover:text-foreground focus:bg-hover-bg focus:text-foreground"
                    >
                      <BadgeCheck />
                      {labels?.settings ?? "Settings"}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                {onLogoutClick && (
                  <DropdownMenuItem
                    onClick={onLogoutClick}
                    className="flex items-center gap-2 py-2 px-3 text-sm cursor-pointer rounded-lg transition-all duration-200 text-muted-foreground hover:bg-hover-bg hover:text-foreground focus:bg-hover-bg focus:text-foreground"
                  >
                    <LogOut />
                    {labels?.logout ?? "Log out"}
                  </DropdownMenuItem>
                )}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

