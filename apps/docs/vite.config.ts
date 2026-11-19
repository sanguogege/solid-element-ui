import solid from "@solidjs/vite-plugin";
import { createSolidBase } from "@kobalte/solidbase/config";
import defaultTheme from "@kobalte/solidbase/default-theme";
import { defineConfig } from "vite-plus";

const solidBase = createSolidBase(defaultTheme);

export default defineConfig({
  plugins: [
    solidBase.plugin({
      title: "solid-element-ui",
      description: "Documentation site for solid-element-ui",
    }),
    solid(solidBase.startConfig()),
  ],
} as any);
