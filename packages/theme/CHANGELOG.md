# @sijil/theme

## 0.2.2

### Patch Changes

- Ship the Cairo latin and arabic subsets with the Sijil theme.

## 0.2.1

### Patch Changes

- Set Cairo and an 18px root size as the Sijil defaults.

## 0.2.0

### Minor Changes

- Add themed separator colors and a complete shadow scale. Apply separator colors to app headers and menu dividers.

### Patch Changes

- Restore the original default surfaces for tabs, period navigation, and segmented settings. Match the calendar toolbar buttons to the neighboring control groups.
  
  Restore the dark muted surface and dark-blue hover colors from the original Sijil palette.
- Restore the Sijil dark theme's status colors and card surface from the original palette.
- Extract the shared CSS tokens and Tailwind v4 overrides into @sijil/theme. The existing @sijil/ui component exports and CSS imports remain available.
- Match the sidebar, navigation flyout, team switcher, and user menu to the HR shell, including selected indicators and sidebar colors.
