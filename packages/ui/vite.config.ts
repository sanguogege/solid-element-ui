import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
export default defineConfig({
    plugins: [
        solidPlugin(),
        dts({ include: ["src"] }),
        tailwindcss(),
        Icons({
            compiler: "solid",
            autoInstall: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.tsx"),
            formats: ["es"],
            fileName: "index",
        },
        rollupOptions: {
            external: [
                "solid-js",
                "solid-js/web",
                "solid-js/store",
                "@kobalte/core",
                "tailwind-variants",
            ],
        },
    },
});
