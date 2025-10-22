# 🏬 Storefront Microfrontend (Module Federation + Rspack + React 19)

This project is a **React 19 microfrontend architecture** using **Module Federation + Rspack** in a **pnpm monorepo**. It consists of:

- **Container (Host)** – runs the main shell and loads remotes
- **Products (Remote)** – exposes federated React components such as `ProductList`

The setup is intentionally minimal, fast, and deployment-friendly.

---

## ✅ Tech Stack

| Category | Technology |
|----------|------------|
| Bundler / Dev Server | **Rspack** |
| Federation Runtime | `@module-federation/rspack` |
| Language | TypeScript |
| UI Framework | React 19 |
| State (future) | Jotai |
| Data Layer (future) | TanStack Query |
| Routing (future) | TanStack Router |
| Package Manager | pnpm (workspace monorepo) |

---

## ✅ Monorepo Structure

storefront-mfe/
apps/
container/ (host)
products/ (remote)
pnpm-workspace.yaml
package.json

---

## ✅ Installation (Fresh Clone)

```sh
pnpm install
```
### ✅ Running the Apps (Development)
Start Products Remote
```bash
pnpm --filter products dev
```
Runs on: http://localhost:3001
Start Container Host
```bash
pnpm --filter container dev
```

Runs on: http://localhost:3000

## ✅ Module Federation Configuration
Remote: apps/products/rspack.config.cjs
```js
new ModuleFederationPlugin({
  name: "products",
  filename: "remoteEntry.js",
  exposes: {
    "./ProductList": "./src/ProductList.tsx",
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: false },
    "react-dom": { singleton: true, eager: true, requiredVersion: false },
  },
  dts: false,
  runtimePlugins: [],
})
```
Host: `apps/container/rspack.config.cjs`
```js
new ModuleFederationPlugin({
  name: "container",
  remotes: {
    products: "products@http://localhost:3001/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: false },
    "react-dom": { singleton: true, eager: true, requiredVersion: false },
  },
  dts: false,
  runtimePlugins: [],
})

```
## ✅ Why This Setup Works
Win	- Reason
Rspack + MF plugin	- Fast + native federation support
No conflicting Vite dev servers	- Fewer moving parts
eager + singleton shared React	- Avoids runtime share errors
Disabled type-hint runtime	- Removes noisy websockets & console spam

## ✅ Recreating This From Scratch (Quick Start)
```js
# 1) create monorepo
pnpm init
pnpm add -D @rspack/cli

# 2) create apps
mkdir -p apps/container apps/products

# 3) init apps
cd apps/container && pnpm init -y
cd ../products && pnpm init -y

# 4) install deps in each app
pnpm add react react-dom
pnpm add -D @module-federation/rspack @rspack/core @rspack/cli @rspack/dev-server @rspack/plugin-react-refresh typescript @types/react @types/react-dom

```
## ✅ Next Steps (Planned)
### Feature	 - Status
Shared cart via Jotai	⏳
Fetch products via TanStack Query	⏳
Routing (TanStack Router)	⏳
Deploy container & products on Vercel ⏳

## ✅ Summary

You now have:

A clean React microfrontend architecture

Working runtime Module Federation

Independently runnable apps

A repeatable, teachable, and deployable foundation

To continue, run:
```js
pnpm --filter products dev
pnpm --filter container dev
```
