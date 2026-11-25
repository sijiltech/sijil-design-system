# @sijil/theme

CSS design tokens for projects using Tailwind CSS v4. The theme configures Tailwind's font, radii, shadows and transition defaults. It also provides semantic color utilities such as `bg-primary` and `text-success`.

```css
@import "tailwindcss";
@import "@sijil/theme/theme.css";
@import "@sijil/theme/sijil.css";
```

`theme.css` registers the tokens with Tailwind. `sijil.css` sets the Sijil color palette, Roboto font stack and base radius. Add `dark` for the monochrome palette or `dark-blue` for the blue palette.

Projects with their own palette can import `theme.css` and define their semantic colors in their own CSS. Override Tailwind defaults such as `--font-sans`, `--radius-md`, or `--default-transition-duration` in a later `@theme` block.

For Sijil React components, use the CSS imports documented by [@sijil/ui](../ui/README.md), which load these tokens automatically.
