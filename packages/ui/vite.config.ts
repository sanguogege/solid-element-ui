import { resolve } from "node:path";
import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite-plus";

// Runtime packages stay external so consumers keep a single Solid/Kobalte
// instance. Subpaths (`@kobalte/core/button`, `@lucide/solid/icons/...`) are
// covered by the `pkg/` check below.
const externalPackages = ["solid-js", "@solidjs/web", "@kobalte/core", "cn", "@lucide/solid"];

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: [resolve(__dirname, "core/index.tsx"), resolve(__dirname, "style/theme.css")],
      formats: ["es"],
      fileName: "index",
      // The CSS entry above is emitted as dist/theme.css so the package export
      // is a stable file name.
      cssFileName: "theme",
    },
    rollupOptions: {
      external: (id: string) =>
        externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["test/**/*.test.{ts,tsx}"],
  },
  resolve: {
    // @solidjs/testing-library still imports the Solid 1 path `solid-js/web`;
    // Solid 2 moved the DOM runtime to `@solidjs/web`. Tests only.
    alias: { "solid-js/web": "@solidjs/web" },
  },
} as any);
