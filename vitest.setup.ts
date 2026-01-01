import { afterEach } from "vitest";
import { cleanup } from "@solidjs/testing-library";
import "@testing-library/jest-dom";

// 全局自动清理
afterEach(() => {
    cleanup();
});
