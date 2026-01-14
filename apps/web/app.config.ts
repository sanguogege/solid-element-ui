import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        ssr: {
            // 确保 SSR 中包含必要的模块
            // noExternal: ["solid-element-ui", "lucide-solid"],
        },
    },
    ssr: true,
});
