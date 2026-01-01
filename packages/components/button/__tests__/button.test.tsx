import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@solidjs/testing-library";
import { default as SeButton } from "../src/button";
import "@testing-library/jest-dom"; // 提供 toBeInTheDocument 等断言

describe("SeButton 组件测试", () => {
    // 每次测试后清理 DOM

    it("应该正常渲染文字内容", () => {
        render(() => <SeButton>点击我</SeButton>);
        const btn = screen.getByRole("button");
        expect(btn).toHaveTextContent("点击我");
    });

    it("应该包含基础类名", () => {
        render(() => <SeButton>按钮</SeButton>);
        const btn = screen.getByRole("button");
        // 验证基础类名是否存在
        expect(btn.className).toContain("inline-flex");
    });

    it("当设置 loading 时应该是禁用状态且显示特定类名", () => {
        render(() => <SeButton loading={true}>加载中</SeButton>);
        const btn = screen.getByRole("button");
        expect(btn).toBeDisabled();
        expect(btn.className).toContain("opacity-50");
        expect(btn).toHaveAttribute("aria-busy", "true");
    });

    it("点击按钮应该触发 onClick 事件", () => {
        const callback = vi.fn();
        render(() => <SeButton onClick={callback}>点击</SeButton>);
        const btn = screen.getByRole("button");
        fireEvent.click(btn);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("能够合并用户传入的自定义 class", () => {
        render(() => <SeButton class="custom-user-class">自定义</SeButton>);
        const btn = screen.getByRole("button");
        expect(btn).toHaveClass("custom-user-class");
        expect(btn).toHaveClass("inline-flex"); // 原有类名也应保留
    });
});
