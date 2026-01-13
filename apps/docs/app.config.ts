import { defineConfig } from "@solidjs/start/config";
/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { default: mdx } = pkg;
export default defineConfig({
    extensions: ["mdx", "md"],
    vite: {
        plugins: [
            mdx.withImports({})({
                jsx: true,
                jsxImportSource: "solid-js",
                providerImportSource: "solid-mdx",
            }),
            tailwindcss(),
        ],
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
            },
        },
        ssr: {
            noExternal: [
                "solid-mdx",
                "solid-js",
                "@kobalte/core",
                "tailwind-variants",
                "lucide-solid",
            ],
        },
    },
});
