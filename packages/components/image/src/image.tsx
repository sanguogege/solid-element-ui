import { splitProps, type Component, createSignal, Show } from "solid-js";
import { cn } from "@/utils/cn";
import { type ImageProps } from "./setting";

export const SeImage: Component<ImageProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "src",
        "alt",
        "width",
        "height",
        "fallback",
        "placeholder",
        "preview",
    ]);

    const [status, setStatus] = createSignal<"loading" | "error" | "done">(
        "loading"
    );
    const [isPreviewOpen, setIsPreviewOpen] = createSignal(false);

    const handleLoad = () => setStatus("done");
    const handleError = () => setStatus("error");

    const sizeStyle = () => ({
        width:
            typeof local.width === "number" ? `${local.width}px` : local.width,
        height:
            typeof local.height === "number"
                ? `${local.height}px`
                : local.height,
    });

    return (
        <div
            class={cn(
                "relative inline-block overflow-hidden bg-[#f5f5f5] rounded-[var(--radius,4px)] group",
                local.class
            )}
            style={sizeStyle()}
        >
            {/* 1. 占位状态 (Loading) */}
            <Show when={status() === "loading" && local.placeholder}>
                <div class="absolute inset-0 z-10 flex items-center justify-center bg-[#fafafa]">
                    {local.placeholder}
                </div>
            </Show>

            {/* 2. 核心图片 */}
            <img
                {...others}
                src={
                    status() === "error"
                        ? local.fallback || local.src
                        : local.src
                }
                alt={local.alt}
                onLoad={handleLoad}
                onError={handleError}
                class={cn(
                    "block object-cover w-full h-full transition-opacity duration-300",
                    status() === "done" ? "opacity-100" : "opacity-0",
                    local.preview && status() === "done" && "cursor-pointer"
                )}
                onClick={() =>
                    local.preview &&
                    status() === "done" &&
                    setIsPreviewOpen(true)
                }
            />

            {/* 3. 预览蒙层 (Hover 效果) */}
            <Show when={local.preview && status() === "done"}>
                <div
                    onClick={() => setIsPreviewOpen(true)}
                    class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 cursor-pointer bg-black/25 group-hover:opacity-100"
                >
                    <div class="flex items-center gap-2 text-white text-sm">
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                stroke-width="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        预览
                    </div>
                </div>
            </Show>

            {/* 4. 预览弹窗 (Viewer) */}
            <Show when={isPreviewOpen()}>
                <div
                    class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setIsPreviewOpen(false)}
                >
                    <div class="relative max-w-[90vw] max-h-[90vh]">
                        <img
                            src={local.src}
                            class="object-contain w-full h-full shadow-2xl animate-in zoom-in-95 duration-300"
                            alt="preview"
                        />
                        {/* 关闭按钮 */}
                        <button class="absolute -top-12 right-0 p-2 text-white hover:text-blue-400 transition-colors">
                            <svg
                                class="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </Show>
        </div>
    );
};
