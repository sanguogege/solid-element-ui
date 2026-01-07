// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
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
                    label: "components",
                    autogenerate: { directory: "components" },
                },
            ],
        }),
        mdx(),
        solidJs(),
    ],
    vite: {
        ssr: {
            // 强制将 solid-js 及其相关包纳入 SSR 处理流程
            noExternal: [
                "solid-js",
                "solid-element-ui",
                "@solid-element-ui/utils",
            ],
        },
        resolve: {
            // 确保服务端和客户端都使用相同的条件名
            conditions: ["solid", "development", "browser", "import"],
        },
        plugins: [tailwindcss()],
    },
});
