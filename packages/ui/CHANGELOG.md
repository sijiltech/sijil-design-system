# @sijil/ui

## 0.2.2

### Patch Changes

- Updated dependencies
  - @sijil/theme@0.2.2

## 0.2.1

### Patch Changes

- Set Cairo and an 18px root size as the Sijil defaults. Make the app header background transparent with no shadow.
- Updated dependencies
  - @sijil/theme@0.2.1

## 0.2.0

### Minor Changes

- Add raised surface variants for month navigation and tabs. Add a plain FlexTable presentation and an option to hide the unsorted indicator while keeping keyboard sorting.
  
  Add bordered status badges and bordered semantic buttons with the original attendance sheet colors, outlines, and hover treatment. Add a full-width button option for table actions.
- Share the borderless chart tooltip surface between built-in and custom chart tooltips.
- Add a toolbar button variant that keeps calendar actions aligned with the adjacent controls.
- Add a day, month and year picker for period navigation, single and paired date fields, and a record navigator with direct position entry.
- Add shared date-period and selection popovers. Support action-based pagination, record navigation callbacks, chart overlays, and application-managed theme storage.
- Add an inline multi-select variant for editing lists of tagged values in table cells.
- Support static chart legends, controls embedded in mobile settings rows, and direct access to the ScrollArea element through a ref.
- Add screen frames, toolbars, sections, and responsive grids. Screen headers can accept page actions while preserving existing title and badge layouts.
- Extract the shared CSS tokens and Tailwind v4 overrides into @sijil/theme. The existing @sijil/ui component exports and CSS imports remain available.

### Patch Changes

- Give header buttons a shared hover shimmer. Preview the destination palette on the theme toggle.
- Restore the original default surfaces for tabs, period navigation, and segmented settings. Match the calendar toolbar buttons to the neighboring control groups.
  
  Restore the dark muted surface and dark-blue hover colors from the original Sijil palette.
- Restore the Sijil dark theme's status colors and card surface from the original palette.
- Match the sidebar, navigation flyout, team switcher, and user menu to the HR shell, including selected indicators and sidebar colors.
- Add themed separator colors and a complete shadow scale. Apply separator colors to app headers and menu dividers.
- Updated dependencies
  - @sijil/theme@0.2.0
