import { defineConfig } from "vite-plus";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import { createSolidBase } from "@kobalte/solidbase/config";

import tailwindcss from "@tailwindcss/vite";

import path from "path";
import {
  createDefaultThemeFilesystemSidebar,
  default as defaultTheme,
} from "@kobalte/solidbase/default-theme";

const solidbase = createSolidBase(defaultTheme);

const collator = new Intl.Collator(undefined, { numeric: true });

export default defineConfig({
  resolve: {
    alias: {
      "~/": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      external: ["solid-js", "tailwind-merge"],
    },
  },
  plugins: [
    tailwindcss(),
    solidbase.plugin({
      title: "solid-element-ui",
      titleTemplate: ":title - ui",
      description: "Fully featured, fully customisable static site generation for SolidStart",
      themeConfig: {
        nav: [
          {
            text: "Components",
            link: "/docs/core",
          },
          {
            text: "Changelog",
            link: "/docs/changelog",
          },
        ],
        sidebar: {
          "/docs/core": createDefaultThemeFilesystemSidebar("./src/routes/docs/core", {
            sort: (a, b) => {
              if (a.filePath.includes("i18n-provider")) return 1;
              if (b.filePath.includes("i18n-provider")) return -1;
              if (a.filePath.includes("index")) return -1;
              if (a.filePath > b.filePath) return 1;
              if (b.filePath > a.filePath) return -1;
              return 0;
            },
          }),
          "/docs/changelog": [
            {
              title: "Changelog",
              items: createDefaultThemeFilesystemSidebar("./src/routes/docs/changelog", {
                sort: (a, b) => {
                  return collator.compare(b.filePath, a.filePath);
                },
              }),
            },
          ],
        },
      },
    }),
    solidStart(solidbase.startConfig()),
    nitro({
      prerender: {
        crawlLinks: true,
      },
    }),
  ],
} as any);
