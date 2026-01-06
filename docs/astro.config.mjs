// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import solidJs from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: "solid-element-ui",
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/withastro/starlight",
                },
            ],
            sidebar: [
                {
                    label: "Guides",
                    items: [
                        // Each item here is one entry in the navigation menu.
                        { label: "Example Guide", slug: "guides/example" },
                    ],
                },
                {
                    label: "组件",
                    autogenerate: { directory: "components" },
                },
            ],
        }),
        solidJs(),
        mdx(),
    ],
    vite: {
        resolve: {
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
            alias: {
                // 1. 将包名直接映射到源码 index.tsx
                "solid-element-ui": path.resolve(
                    __dirname,
                    "../packages/solid-element-ui/index.tsx"
                ),
                // 2. 映射内部子包的源码路径
                "@solid-element-ui/components": path.resolve(
                    __dirname,
                    "../packages/components/index.ts"
                ),
                "@solid-element-ui/utils": path.resolve(
                    __dirname,
                    "../packages/utils/index.ts"
                ),
            },
        },
        ssr: {
            // 3. 非常重要：必须包含在 noExternal 中，否则 Astro 会尝试用 Node.js 运行 TSX
            noExternal: ["solid-element-ui", /@solid-element-ui\/.*/],
        },
        optimizeDeps: {
            // 4. 防止 Vite 预构建这些包，强制走源码转换
            exclude: ["solid-element-ui"],
        },
    },
});
