import {
    splitProps,
    type Component,
    For,
    Show,
    type ParentComponent,
} from "solid-js";
import { type SkeletonProps, type SkeletonElementProps } from "./setting";

// --- 基础占位单元 ---
export const SeSkeletonElement: Component<SkeletonElementProps> = (props) => {
    const [local, others] = splitProps(props, [
        "shape",
        "active",
        "width",
        "height",
        "size",
        "class",
    ]);

    const shapeClass = () => {
        switch (local.shape) {
            case "circle":
                return "rounded-full";
            case "button":
                return "rounded-md w-20 h-8";
            case "input":
                return "rounded h-8 w-full";
            default:
                return "rounded-md";
        }
    };

    return (
        <div
            {...others}
            class={`bg-gray-200 ${shapeClass()} ${
                local.active !== false ? "animate-pulse" : ""
            } ${local.class || ""}`}
            style={{
                width:
                    typeof local.width === "number"
                        ? `${local.width}px`
                        : local.width,
                height:
                    typeof local.height === "number"
                        ? `${local.height}px`
                        : local.height,
            }}
        />
    );
};

// --- 组合型骨架屏 ---
export const SeSkeleton: ParentComponent<SkeletonProps> = (props) => {
    // 注意此处从 local 中提取出的 title 是 boolean 类型
    const [local, others] = splitProps(props, [
        "loading",
        "avatar",
        "title",
        "paragraph",
        "active",
        "class",
        "children",
    ]);

    const rows = () => {
        if (typeof local.paragraph === "object") return local.paragraph.rows;
        return local.paragraph || 3;
    };

    const getRowWidth = (index: number) => {
        if (typeof local.paragraph === "object" && local.paragraph.width) {
            if (Array.isArray(local.paragraph.width))
                return local.paragraph.width[index] || "100%";
            return local.paragraph.width;
        }
        return index === rows() - 1 ? "60%" : "100%";
    };

    return (
        <Show when={local.loading !== false} fallback={local.children}>
            <div {...others} class={`flex w-full gap-4 ${local.class || ""}`}>
                <Show when={local.avatar}>
                    <SeSkeletonElement
                        shape="circle"
                        width={40}
                        height={40}
                        active={local.active}
                    />
                </Show>

                <div class="flex-1 space-y-3">
                    {/* 这里正确识别 local.title 为 boolean */}
                    <Show when={local.title !== false}>
                        <SeSkeletonElement
                            shape="rect"
                            width="38%"
                            height={16}
                            active={local.active}
                        />
                    </Show>

                    <div class="space-y-2">
                        <For each={Array.from({ length: rows() })}>
                            {(_, i) => (
                                <SeSkeletonElement
                                    shape="rect"
                                    width={getRowWidth(i())}
                                    height={14}
                                    active={local.active}
                                />
                            )}
                        </For>
                    </div>
                </div>
            </div>
        </Show>
    );
};
