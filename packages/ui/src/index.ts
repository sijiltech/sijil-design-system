/**
 * `@sijil/ui`: core entry point.
 *
 * Only dependency-light components live here. Components that need heavy or
 * optional peer dependencies are exposed through dedicated subpath exports:
 * `@sijil/ui/calendar`, `@sijil/ui/date-picker`, `@sijil/ui/chart`,
 * `@sijil/ui/command` and `@sijil/ui/flex-table`.
 */

// Utilities
export type { GroupVariant } from "./lib/group-variant.js";
export { cn } from "./lib/cn.js";
export { useIsMobile } from "./hooks/use-is-mobile.js";

// Provider
export { DesignSystemProvider, type DesignSystemProviderProps } from "./provider/design-system-provider.js";
export { useDesignSystem } from "./provider/use-design-system.js";
export type { DesignSystemContextValue } from "./provider/design-system-context.js";
export { defaultDesignSystemLabels, type DesignSystemLabels } from "./provider/labels.js";
export {
  ThemeProvider,
  useTheme,
  type Theme,
  type ResolvedTheme,
  type ThemeProviderProps,
  type ThemeStorage,
  type ThemeContextValue,
} from "./provider/theme-provider.js";

// Direction
export { DirectionProvider, useDirection } from "./components/direction.js";

// Theme & Locale Toggles
export { ModeToggle, ThemeToggle, type ModeToggleProps } from "./components/mode-toggle.js";
export { LanguageSwitcher, LanguageToggle, type LanguageSwitcherProps, type AppLanguage } from "./components/language-switcher.js";

// Primitives & form controls
export { Button, buttonVariants, type ButtonProps } from "./components/button.js";
export { Input } from "./components/input.js";
export { Textarea, type TextareaProps } from "./components/textarea.js";
export { Label } from "./components/label.js";
export { Checkbox } from "./components/checkbox.js";
export { Switch } from "./components/switch.js";
export { RadioGroup, type RadioGroupProps } from "./components/radio-group.js";
export { RadioGroupItem, type RadioGroupItemProps } from "./components/radio-group-item.js";
export { Slider, type SliderProps } from "./components/slider.js";
export { Toggle, toggleVariants, type ToggleProps } from "./components/toggle.js";
export { ToggleGroup, type ToggleGroupProps } from "./components/toggle-group.js";
export { ToggleGroupItem, type ToggleGroupItemProps } from "./components/toggle-group-item.js";
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
  type FieldGroupProps,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./components/field.js";
export { DatePickerButton, type DatePickerButtonProps } from "./components/date-picker-button.js";
export { RecordNavigator, type RecordNavigatorProps } from "./components/record-navigator.js";
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
  type TabsProps,
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
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, type AccordionProps } from "./components/accordion.js";
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
export { Progress, type ProgressProps, type ProgressVariant } from "./components/progress.js";
export { Spinner, type SpinnerProps, type SpinnerSize, type SpinnerVariant } from "./components/spinner.js";
export {
  Suspense,
  LoadingSuspense,
  SuspenseFallback,
  LoadingFallback,
  type SuspenseProps,
  type SuspenseFallbackProps,
  type SuspenseVariant,
} from "./components/suspense.js";
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
export { ScrollArea, type ScrollAreaProps } from "./components/scroll-area.js";
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
export {
  SortableTableHead,
  SortableFlexTableHead,
  type SortableTableHeadProps,
  type SimpleSortDirection,
} from "./components/sortable-table-head.js";
export {
  TableColumnFilter,
  type TableColumnFilterProps,
  type ColumnFilterItem,
} from "./components/table-column-filter.js";

// Layout & Navigation controls
export { Separator } from "./components/separator.js";
export { ScreenContainer } from "./components/screen-container.js";
export { ScreenFrame, type ScreenFrameProps } from "./components/screen-frame.js";
export { ScreenGrid, type ScreenGridProps } from "./components/screen-grid.js";
export { ScreenHeader, type ScreenHeaderProps } from "./components/screen-header.js";
export { ScreenSection } from "./components/screen-section.js";
export { ScreenToolbar, type ScreenToolbarProps } from "./components/screen-toolbar.js";
export { FiltersContainer, type FiltersContainerProps } from "./components/filters-container.js";
export {
  MultiSelectDropdown,
  type MultiSelectDropdownProps,
  type MultiSelectOption,
} from "./components/multi-select-dropdown.js";
export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
  type ButtonGroupProps,
} from "./components/button-group.js";
export {
  CollapsibleCard,
  type CollapsibleCardProps,
} from "./components/collapsible-card.js";
export {
  NavMain,
  type NavMainProps,
  type NavMainItem,
  type NavMainSubItem,
} from "./components/nav-main.js";
export {
  NavUser,
  type NavUserProps,
  type NavUserData,
} from "./components/nav-user.js";
export {
  TeamSwitcher,
  SidebarBrand,
  type TeamSwitcherProps,
  type SidebarBrandData,
} from "./components/team-switcher.js";
export {
  AppHeader,
  type AppHeaderProps,
} from "./components/app-header.js";
export {
  MobileBottomNav,
  type MobileBottomNavProps,
  type MobileTabItem,
} from "./components/mobile-bottom-nav.js";
export {
  MobileSettingsRow,
  MobileSettingsSection,
  type MobileSettingsRowProps,
} from "./components/mobile-settings-row.js";
export {
  ChartDefs,
  type ChartDefsProps,
  type PatternDef,
} from "./components/chart-defs.js";
export {
  ChartLegends,
  type ChartLegendsProps,
  type ChartLegendItem,
  type LegendType,
} from "./components/chart-legends.js";
export {
  ChartCard,
  type ChartCardProps,
} from "./components/chart-card.js";
export {
  PullToRefreshIndicator,
  type PullToRefreshIndicatorProps,
  type PullToRefreshPhase,
} from "./components/pull-to-refresh-indicator.js";
export {
  Pagination,
  type PaginationProps,
} from "./components/pagination.js";
export {
  PaginationContent,
  type PaginationContentProps,
} from "./components/pagination-content.js";
export {
  PaginationItem,
  type PaginationItemProps,
} from "./components/pagination-item.js";
export {
  PaginationLink,
  type PaginationLinkProps,
} from "./components/pagination-link.js";
export {
  PaginationPrevious,
  type PaginationPreviousProps,
} from "./components/pagination-previous.js";
export {
  PaginationNext,
  type PaginationNextProps,
} from "./components/pagination-next.js";
export { PaginationEllipsis } from "./components/pagination-ellipsis.js";
export {
  PeriodNavigator,
  type PeriodNavigatorProps,
} from "./components/period-navigator.js";
export {
  ActionButtons,
  type ActionButtonsProps,
  ActionButtonsHelper,
  approveButtonClass,
  refuseButtonClass,
  ApproveButton,
  type ApproveButtonProps,
  RefuseButton,
  type RefuseButtonProps,
} from "./components/action-buttons.js";

export { SelectionPopover, type SelectionPopoverOption, type SelectionPopoverProps } from "./components/selection-popover.js";
