# Dockvew Modular Plugin

A POC Dockview panel for inclusion in the Dockview plugin repo.

## Project builds

- `npm run build:panel` – generates `dist/sum-panel.js` plus type declarations for publishing the Dockview panel as an npm package. This is also the default `npm run build` target and runs during `npm install` via the `prepare` script.
- `npm run build:app` – produces the full demo application bundle used for local experimentation. Run this when you need the standalone Dockview web app output in `dist/`.


## Publishing

1. Update `package.json` with the scoped package name you want on npm and bump the version (e.g. `npm version patch`).
2. Sign in to npm (`npm login`) if you have not already done so on this machine.
3. Build the distributable: `npm run build:panel` (this runs automatically during `npm publish` because of the `prepare` script).
4. Publish with public access: `npm publish --access public`.


## Dockview panel plugin API

Dockview panels no longer require an imperative registration hook. Installed packages that describe themselves with `dockview.panels` metadata are picked up automatically and their constructors are wired into the registry before the workspace is created.

### Declaring panels in package.json

Third-party npm packages can self-describe the panels they expose by adding a `dockview.panels` stanza to their `package.json`:

```jsonc
{
  "name": "@vendor/my-panels",
  "version": "1.2.3",
  "dockview": {
    "panels": [
      {
        "name": "vendorWelcome",
        "module": "dist/welcome-panel.js",
        "export": "WelcomePanel",
        "title": "Welcome Panel",
      },
      {
        "name": "vendorMetrics",
        "module": "dist/metrics-panel.js",
      },
    ],
  },
}
```

- `name` is the identifier consumers use with `api.addPanel`.
- `module` is resolved relative to the package root unless it is an absolute specifier. Use `./` or `../` prefixes for relative files.
- `export` is optional; if omitted the package must provide a default export that implements `IContentRenderer`.
- `title` is optional; provide it to display a friendly label in menus. Defaults to a title-cased version of `name` when omitted.

### Build-time discovery

A Vite plugin (`vite-plugins/dockviewPlugins.ts`) runs in both dev and build modes. It scans `node_modules` for packages that expose `dockview.panels`, generates a virtual module with static imports for each declared panel, and ships it with the bundle. This keeps the production output self-contained for static hosting setups such as nginx.

### Example package

An example package lives at `plugins/@ztolley/hello-panel/`. It is a standalone Vite + TypeScript project that builds to `dist/hello-panel.js`. The parent application depends on it via an npm `file:` dependency, so the compiled output is installed into `node_modules/@ztolley/hello-panel` and picked up automatically by the discovery plugin.

```
├── package.json          # library metadata, build scripts, Dockview manifest
├── tsconfig.json         # editor settings for TypeScript sources
├── tsconfig.build.json   # emits declaration files alongside the build
├── vite.config.ts        # Vite library build configuration
└── src/
    └── api
      ├── thingsDataProvider.ts
    └── components
      ├── Thing.ts          # A React component that does stuff
    └── panels
      ├── ThingPanel.ts     # panel implementation
      └── index.ts          # library entry point
    └── web-components
      ├── ThingElement.ts   # A Web Component that renders and handles logic


```

Common development commands (run from `plugins/@ztolley/hello-panel`):

- `npm run dev` – start a Vite dev server for local experimentation.
- `npm run build` – clean, emit type declarations, and bundle the library. This runs automatically via the package’s `prepare` script when the parent installs dependencies.
- `npm publish` – once satisfied, publish the built library to npm. The `files` field ensures only the compiled output is shipped.
