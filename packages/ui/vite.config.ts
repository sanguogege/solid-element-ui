import { defineConfig } from "vite-plus";
import solid from "@solidjs/vite-plugin";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

// Externals must also cover package subpaths (`@kobalte/core/button`, ...), otherwise Rolldown
// inlines those modules into the library bundle instead of resolving them from the consumer.
const externalPackages = ["solid-js", "@solidjs/web", "@kobalte/core", "cn"];

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, "./core/index.tsx"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: (id: string) => externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`)),
    },
  }
} as any);
