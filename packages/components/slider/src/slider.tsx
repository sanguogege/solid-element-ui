import {
    splitProps,
    type Component,
    createSignal,
    onCleanup,
    createMemo,
} from "solid-js";
import { cn } from "@solid-element-ui/utils/cn";
import { type SliderProps } from "./setting";

export const SeSlider: Component<SliderProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "value",
        "min",
        "max",
        "step",
        "disabled",
        "error",
        "onChange",
    ]);

    const min = () => local.min ?? 0;
    const max = () => local.max ?? 100;
    const step = () => local.step ?? 1;
    const value = () => local.value ?? min();

    let railRef: HTMLDivElement | undefined;
    const [isDragging, setIsDragging] = createSignal(false);

    // 计算百分比位置 (0-100)
    const percentage = createMemo(() => {
        const p = ((value() - min()) / (max() - min())) * 100;
        return Math.max(0, Math.min(100, p));
    });

    // 核心逻辑：将像素位置转换为数值
    const getValueFromEvent = (e: MouseEvent | TouchEvent) => {
        if (!railRef) return value();
        const rect = railRef.getBoundingClientRect();
        const clientX =
            "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

        // 计算点击位置在轨道中的比例
        let diff =
            ((clientX - rect.left) / rect.width) * (max() - min()) + min();

        // 处理步长 step
        const steps = Math.round((diff - min()) / step());
        let nextValue = steps * step() + min();

        // 边界限制
        return Math.max(min(), Math.min(max(), nextValue));
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
        if (local.disabled) return;
        const nextValue = getValueFromEvent(e);
        local.onChange?.(nextValue);
    };

    const handleEnd = () => {
        setIsDragging(false);
        window.removeEventListener("mousemove", handleMove as any);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchmove", handleMove as any);
        window.removeEventListener("touchend", handleEnd);
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
        if (local.disabled) return;
        setIsDragging(true);
        handleMove(e); // 点击即跳转

        window.addEventListener("mousemove", handleMove as any);
        window.addEventListener("mouseup", handleEnd);
        window.addEventListener("touchmove", handleMove as any);
        window.addEventListener("touchend", handleEnd);
    };

    onCleanup(() => handleEnd());

    return (
        <div
            {...others}
            class={cn(
                "relative w-full h-8 flex items-center group touch-none",
                local.disabled ? "cursor-not-allowed" : "cursor-pointer",
                local.class
            )}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
        >
            {/* 底部轨道 (背景) */}
            <div
                ref={railRef}
                class={cn(
                    "absolute w-full h-1 rounded-full transition-colors",
                    local.disabled
                        ? "bg-[#f5f5f5]"
                        : "bg-[#f5f5f5] group-hover:bg-[#e8e8e8]"
                )}
            />

            {/* 激活部分 (进度条) */}
            <div
                class={cn(
                    "absolute h-1 rounded-full transition-colors",
                    local.disabled
                        ? "bg-[#00000040]"
                        : "bg-[#1677ff] group-hover:bg-[#4096ff]",
                    local.error && "bg-[#ff4d4f]"
                )}
                style={{ width: `${percentage()}%` }}
            />

            {/* 滑块圆点 (Handle) */}
            <div
                class={cn(
                    "absolute w-3.5 h-3.5 bg-white border-2 border-[#1677ff] rounded-full transition-all duration-200 shadow-sm",
                    "hover:scale-125 hover:border-[#4096ff]",
                    isDragging() &&
                        "scale-125 border-[#4096ff] shadow-[0_0_0_5px_rgba(22,119,255,0.12)]",
                    local.disabled &&
                        "border-[#00000040] hover:scale-100 shadow-none",
                    local.error && "border-[#ff4d4f]"
                )}
                style={{
                    left: `${percentage()}%`,
                    transform: "translateX(-50%)",
                }}
            />
        </div>
    );
};
