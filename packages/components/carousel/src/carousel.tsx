import {
    splitProps,
    type ParentComponent,
    createSignal,
    onMount,
    onCleanup,
    children,
    For,
    Show,
} from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { type CarouselProps } from "./setting";

export const SeCarousel: ParentComponent<CarouselProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "children",
        "autoplay",
        "dotPosition",
        "dots",
        "autoplaySpeed",
        "effect",
    ]);

    const [currentIndex, setCurrentIndex] = createSignal(0);
    const resolved = children(() => local.children);
    const count = () => resolved.toArray().length;

    let timer: any;

    const startTimer = () => {
        if (local.autoplay && count() > 1) {
            timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % count());
            }, local.autoplaySpeed ?? 3000);
        }
    };

    const stopTimer = () => {
        if (timer) clearInterval(timer);
    };

    onMount(() => startTimer());
    onCleanup(() => stopTimer());

    return (
        <div
            {...others}
            class={cn("relative overflow-hidden group rounded-lg", local.class)}
            onMouseEnter={stopTimer}
            onMouseLeave={startTimer}
        >
            {/* 轮播轨道 */}
            <div
                class={cn(
                    "flex w-full transition-transform duration-500 ease-in-out",
                    local.effect === "fade" ? "transition-opacity" : ""
                )}
                style={{
                    transform: `translateX(-${currentIndex() * 100}%)`,
                }}
            >
                <For each={resolved.toArray()}>
                    {(child) => <div class="w-full flex-shrink-0">{child}</div>}
                </For>
            </div>

            {/* 面板指示点 Dots */}
            <Show when={local.dots !== false}>
                <div
                    class={cn(
                        "absolute flex gap-2 z-10",
                        local.dotPosition === "top"
                            ? "top-4 left-1/2 -translate-x-1/2"
                            : local.dotPosition === "left"
                            ? "left-4 top-1/2 -translate-y-1/2 flex-col"
                            : local.dotPosition === "right"
                            ? "right-4 top-1/2 -translate-y-1/2 flex-col"
                            : "bottom-4 left-1/2 -translate-x-1/2" // default bottom
                    )}
                >
                    <For each={resolved.toArray()}>
                        {(_, index) => (
                            <button
                                onClick={() => setCurrentIndex(index())}
                                class={cn(
                                    "h-1 rounded-full transition-all duration-300",
                                    currentIndex() === index()
                                        ? "w-6 bg-white opacity-100"
                                        : "w-4 bg-white/50 hover:bg-white/80 opacity-50"
                                )}
                            />
                        )}
                    </For>
                </div>
            </Show>

            {/* 翻页按钮 (2026 增强交互：悬浮显示) */}
            <div class="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <button
                    onClick={() =>
                        setCurrentIndex(
                            (prev) => (prev - 1 + count()) % count()
                        )
                    }
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors pointer-events-auto"
                >
                    <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() =>
                        setCurrentIndex((prev) => (prev + 1) % count())
                    }
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors pointer-events-auto"
                >
                    <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
