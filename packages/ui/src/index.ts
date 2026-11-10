/**
 * `@sijil/ui`: core entry point.
 *
 * Only dependency-light components live here. Components that need heavy or
 * optional peer dependencies are exposed through dedicated subpath exports:
 * `@sijil/ui/calendar`, `@sijil/ui/date-picker`, `@sijil/ui/chart`,
 * `@sijil/ui/command` and `@sijil/ui/flex-table`.
 */

// Utilities
export { cn } from "./lib/cn.js";
export { useIsMobile } from "./hooks/use-is-mobile.js";

// Provider
export { DesignSystemProvider, type DesignSystemProviderProps } from "./provider/design-system-provider.js";
export { useDesignSystem } from "./provider/use-design-system.js";
export type { DesignSystemContextValue } from "./provider/design-system-context.js";
export { defaultDesignSystemLabels, type DesignSystemLabels } from "./provider/labels.js";

// Direction
export { DirectionProvider, useDirection } from "./components/direction.js";

// Primitives & form controls
export { Button, buttonVariants } from "./components/button.js";
export { Input } from "./components/input.js";
export { Label } from "./components/label.js";
export { Checkbox } from "./components/checkbox.js";
export { Switch } from "./components/switch.js";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./components/select.js";
export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./components/field.js";
export { DatePickerButton, type DatePickerButtonProps } from "./components/date-picker-button.js";
export {
  SegmentedControl,
  type SegmentedControlOption,
  type SegmentedControlProps,
} from "./components/segmented-control.js";

// Overlays
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog.js";
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/alert-dialog.js";
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/sheet.js";
export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "./components/popover.js";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/tooltip.js";
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./components/dropdown-menu.js";

// Navigation & disclosure
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type TabsListProps,
  type TabsTriggerProps,
} from "./components/tabs.js";
export { MultiTabs, type MultiTabItem, type MultiTabsProps } from "./components/multi-tabs.js";
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/breadcrumb.js";
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/accordion.js";
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/collapsible.js";
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./components/sidebar.js";

// Data display & feedback
export { Avatar, AvatarFallback, AvatarImage } from "./components/avatar.js";
export { Badge, badgeVariants } from "./components/badge.js";
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/card.js";
export { EmptyState, type EmptyStateProps } from "./components/empty-state.js";
export { Skeleton } from "./components/skeleton.js";
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/table.js";

// Layout
export { Separator } from "./components/separator.js";
export { ScreenContainer } from "./components/screen-container.js";
export { ScreenHeader, type ScreenHeaderProps } from "./components/screen-header.js";
export { FiltersContainer } from "./components/filters-container.js";

