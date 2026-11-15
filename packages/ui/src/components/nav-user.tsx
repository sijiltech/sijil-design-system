"use client";

import * as React from "react";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import { cn } from "../lib/cn.js";
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
  onSettingsClick,
  onLogoutClick,
  labels,
  className,
  children,
}: NavUserProps) {
  const { isMobile } = useSidebar();
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
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Avatar className="size-8 rounded-lg shrink-0">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback className="rounded-lg text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-start text-sm leading-tight truncate">
                <span className="truncate font-semibold">{user.name}</span>
                {user.email && (
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                )}
              </div>
              <ChevronsUpDown className="ltr:ml-auto rtl:mr-auto size-4 shrink-0 opacity-70" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg p-1.5 shadow-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-1.5 text-start text-sm">
                <Avatar className="size-8 rounded-lg shrink-0">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="rounded-lg text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-start text-sm leading-tight truncate">
                  <span className="truncate font-semibold">{user.name}</span>
                  {user.email && (
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {children ? (
              children
            ) : (
              <>
                <DropdownMenuGroup>
                  {onProfileClick && (
                    <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer gap-2">
                      <User className="size-4 opacity-70" />
                      <span>{labels?.profile ?? "Profile"}</span>
                    </DropdownMenuItem>
                  )}
                  {onSettingsClick && (
                    <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer gap-2">
                      <Settings className="size-4 opacity-70" />
                      <span>{labels?.settings ?? "Settings"}</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                {(onProfileClick || onSettingsClick) && onLogoutClick && <DropdownMenuSeparator />}
                {onLogoutClick && (
                  <DropdownMenuItem
                    onClick={onLogoutClick}
                    className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                  >
                    <LogOut className="size-4 opacity-70" />
                    <span>{labels?.logout ?? "Log out"}</span>
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

