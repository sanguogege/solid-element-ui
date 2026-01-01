import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";


export default defineConfig({
    plugins: [solid(), tailwindcss()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "packages"),
        },
    },
    build: {
        lib: {
            entry: "./index.ts",
            formats: ["es"],
            fileName: "index",
        },
        rollupOptions: {
            external: ["solid-js"],
            output: {
                globals: {
                    "solid-js": "SolidJS",
                },
            },
        },
    },
});
