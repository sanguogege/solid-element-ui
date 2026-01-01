import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [solid(), tailwindcss()],
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
