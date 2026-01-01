import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";

export default defineConfig({
    plugins: [solid({ ssr: false })],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./vitest.setup.ts"], // 这里的路径要写对
        deps: {
            optimizer: {
                web: {
                    include: ["@solidjs/testing-library", "solid-js/web"],
                },
            },
        },
    },
});