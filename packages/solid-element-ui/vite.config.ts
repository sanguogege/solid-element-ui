// packages/solid-element-ui/vite.config.ts
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "node:path";

export default defineConfig({
    plugins: [
        solid({
            ssr: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "index.tsx"),
            formats: ["es"], // 现代 Solid 开发通常只需要 es
            fileName: "index",
        },
        rollupOptions: {
            // 核心：库本身不应该包含框架代码
            external: [
                "solid-js",
                "solid-js/web",
                "solid-js/store",
                "@solidjs/router",
                "@solidjs/meta",
            ],
            output: {
                preserveModules: false,
            },
        },
        target: "esnext",
    },
});
