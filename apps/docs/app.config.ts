import { defineConfig } from "@solidjs/start/config";
/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx";

import tailwindcss from "@tailwindcss/vite";

import remarkGfm from "remark-gfm";

const { default: mdx } = pkg;
export default defineConfig({
    extensions: ["mdx", "md"],
    vite: {
        plugins: [
            mdx.withImports({})({
                jsx: true,
                jsxImportSource: "solid-js",
                providerImportSource: "solid-mdx",
                remarkPlugins: [remarkGfm],
            }),
            tailwindcss(),
        ],
        ssr: {
            noExternal: ["solid-element-ui"],
        },
    },
});
