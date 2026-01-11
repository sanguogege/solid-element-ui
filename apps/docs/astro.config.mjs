// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import solidJs from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: "My Docs",
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
                    label: "Reference",
                    autogenerate: { directory: "reference" },
                },
                {
                    label: "components",
                    autogenerate: { directory: "components" },
                },
            ],
            customCss: ["./src/styles/global.css"],
        }),
        solidJs(),
        mdx(),
    ],
    vite: {
        ssr: {
            // 强制将 solid-js 及其相关包纳入 SSR 处理流程
            noExternal: ["solid-js", "solid-element-ui"],
        },
        resolve: {
            // 确保服务端和客户端都使用相同的条件名
            conditions: ["solid", "development", "browser", "import"],
        },
        plugins: [/** @type {any} */ (tailwindcss())],
    },
});
