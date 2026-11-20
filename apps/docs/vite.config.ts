import solid from "@solidjs/vite-plugin";
import { createSolidBase } from "@kobalte/solidbase/config";
import defaultTheme, {
  createDefaultThemeFilesystemSidebar,
} from "@kobalte/solidbase/default-theme";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite-plus";

const solidBase = createSolidBase(defaultTheme);
const componentsSidebar = createDefaultThemeFilesystemSidebar("./src/routes/components", {
  // The components index is reachable from the top nav, not the sidebar.
  filter: (item) => !item.filePath.endsWith("index.mdx"),
});

export default defineConfig({
  plugins: [
    solidBase.plugin({
      title: "solid-element-ui",
      description: "Documentation site for solid-element-ui",
      themeConfig: {
        sidebar: { "/components": componentsSidebar },
        nav: [{ text: "Components", link: "/components" }],
      },
    }),
    solid(solidBase.startConfig()),
    tailwindcss(),
  ],
  optimizeDeps: {
    // Consumed from source through the `solid` export condition.
    exclude: ["solid-element-ui"],
  },
} as any);
