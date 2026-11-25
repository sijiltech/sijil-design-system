# Sijil Design System Workspace

Monorepo workspace managing the centralized Sijil design system packages and documentation.

## Structure

```
design-system/
├── packages/
│   ├── theme/           # @sijil/theme CSS tokens and Tailwind overrides
│   └── ui/              # @sijil/ui React components and their styles
│       ├── src/         # TypeScript components, hooks, provider, tokens
│       ├── styles/      # Component utility registration and family stylesheets
│       ├── tests/       # Unit and accessibility test suite
│       └── dist/        # Compiled ESM distribution & declaration files
├── apps/
│   └── storybook/       # Storybook 8 interactive documentation app
├── docs/                # Architecture and migration documentation
├── .changeset/          # Changesets versioning and release configuration
├── turbo.json           # Turborepo task pipeline configuration
└── package.json         # Workspace root definition (Bun workspaces)
```

## Documentation

- [**Comprehensive Usage Guide (`docs/USAGE.md`)**](docs/USAGE.md): Installation, Next.js & Vite setup, theme tokens, and practical code snippets for all 37 components and subpaths.
- [**Architecture Guide (`docs/ARCHITECTURE.md`)**](docs/ARCHITECTURE.md): Design principles, dependency boundaries, token contract, and verification gates.
- [**Theme usage**](packages/theme/README.md)
- [**Package README (`packages/ui/README.md`)**](packages/ui/README.md): Technical package metadata, exports, and build configuration.

## Available Scripts

From the `design-system/` root directory:

```bash
# Build all packages (@sijil/ui and storybook)
bun run build

# Run unit and accessibility tests
bun run test

# Run Storybook locally in development mode (port 6006)
bun run storybook

# Build static Storybook site
bun run build-storybook

# Create a new version changeset
bun run changeset

# Bump versions based on changesets
bun run version-packages

# Publish to configured private registry
bun run release
```
