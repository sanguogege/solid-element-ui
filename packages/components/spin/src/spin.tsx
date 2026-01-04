import {
    splitProps,
    type ParentComponent,
    Show,
    createSignal,
    createEffect,
    onCleanup,
} from "solid-js";
import { type SpinProps } from "./setting";

export const SeSpin: ParentComponent<SpinProps> = (props) => {
    const [local, others] = splitProps(props, [
        "spinning",
        "tip",
        "delay",
        "size",
        "indicator",
        "fullscreen",
        "class",
        "children",
    ]);

    const [shouldSpin, setShouldSpin] = createSignal(local.spinning ?? true);
    let timer: any;

    // 处理延迟逻辑
    createEffect(() => {
        if (local.delay && local.spinning) {
            timer = setTimeout(() => setShouldSpin(true), local.delay);
        } else {
            setShouldSpin(local.spinning ?? true);
        }
    });

    onCleanup(() => clearTimeout(timer));

    const sizeClass = () => {
        switch (local.size) {
            case "sm":
                return "w-4 h-4";
            case "lg":
                return "w-10 h-10";
            default:
                return "w-7 h-7";
        }
    };

    // 默认加载图标
    const defaultIndicator = (
        <svg
            class={`animate-spin ${sizeClass()} text-blue-500`}
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );

    return (
        <div
            {...others}
            class={`relative inline-block w-full ${
                local.fullscreen ? "fixed inset-0 z-[1000]" : ""
            } ${local.class || ""}`}
        >
            {/* 内容包裹层 */}
            <div
                class={`transition-all duration-300 ${
                    shouldSpin() && local.children
                        ? "opacity-50 blur-[1px] pointer-events-none select-none"
                        : ""
                }`}
            >
                {local.children}
            </div>

            {/* 加载蒙层与图标 */}
            <Show when={shouldSpin()}>
                <div
                    class={`flex flex-col items-center justify-center transition-opacity duration-300 ${
                        local.children
                            ? "absolute inset-0 z-10 bg-white/40"
                            : ""
                    } ${local.fullscreen ? "bg-white/60" : ""}`}
                >
                    <Show when={local.indicator} fallback={defaultIndicator}>
                        {local.indicator}
                    </Show>
                    <Show when={local.tip}>
                        <div class="mt-2 text-sm text-blue-500 font-medium">
                            {local.tip}
                        </div>
                    </Show>
                </div>
            </Show>
        </div>
    );
};
