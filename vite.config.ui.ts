import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
    root: "ui",
    plugins: [solidPlugin(), tailwindcss()],
    server: { fs: { allow: [".."] } },
    resolve: {
        alias: {
            // 建议使用绝对路径，确保从任何地方启动都能找对 packages
            "@": resolve(__dirname, "packages"),
        },
    },
});
