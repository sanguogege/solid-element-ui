// packages/solid-element-ui/vite.config.ts
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "node:path";

export default defineConfig({
    plugins: [solid()],
    build: {
        lib: {
            entry: path.resolve(__dirname, "index.tsx"),
            formats: ["es"],
            fileName: "index",
        },
        rollupOptions: {
            // 将所有同系列的包排除在打包之外
            external: ["solid-js", "solid-js/web"],
        },
    },
    resolve: {
        alias: {
            // 显式映射，防止 Vite 去寻找 package.json 的 exports
            "solid-element-ui/components": path.resolve(
                __dirname,
                "../components"
            ),
            "solid-element-ui/utils": path.resolve(__dirname, "../utils"),
        },
    },
});
