import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    root: "ui",
    plugins: [solidPlugin(), tailwindcss()],
    server: { fs: { allow: [".."] } },
});
