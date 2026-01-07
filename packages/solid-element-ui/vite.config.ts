// packages/solid-element-ui/vite.config.ts
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "node:path";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        solid({
            ssr: true,
        }),
        tailwindcss(),
        dts({
            outDir: "dist",
            staticImport: true,
            insertTypesEntry: true,
            include: ["src/**/*.ts", "src/**/*.tsx", "index.tsx"],
        }),
        // 💡 建议加上之前讨论的“抹除 CSS 引入”插件，防止报错
        {
            name: "remove-css-import",
            transform(code, id) {
                if (id.includes("index.tsx") || id.includes("src")) {
                    return {
                        code: code.replace(
                            /import\s+['"]\.\.\/css\/index\.css['"];?/g,
                            ""
                        ),
                        map: null,
                    };
                }
            },
        },
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "index.tsx"),
            formats: ["es"],
            fileName: "index",
        },
        rollupOptions: {
            external: [
                "solid-js",
                "solid-js/web",
                "solid-js/store",
                "@solidjs/router",
                "@solidjs/meta",
                "../css/index.css", // 保持排除
            ],
        },
        target: "esnext",
    },
});
