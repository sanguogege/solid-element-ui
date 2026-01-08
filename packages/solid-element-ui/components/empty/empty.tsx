import { splitProps, type ParentComponent, Show } from "solid-js";
import { cn } from "@solid-element-ui/utils/cn";
import { type EmptyProps } from "./setting";

export const SeEmpty: ParentComponent<EmptyProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "children",
        "image",
        "imageStyle",
        "description",
    ]);

    // 默认的 AntD 风格空状态插画 (2026 极简版)
    const DefaultImage = () => (
        <svg
            class="w-full h-full opacity-60"
            viewBox="0 0 184 152"
            xmlns="www.w3.org"
        >
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(24 31.67)">
                    <ellipse
                        fill="#f5f5f5"
                        cx="67.797"
                        cy="106.851"
                        rx="67.797"
                        ry="12.668"
                    />
                    <path
                        d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.181-4.593-2.181H44.13c-1.767 0-3.445.795-4.593 2.181L15.611 69.674c-1.148 1.386-1.148 3.511 0 4.897l23.925 29.445c1.148 1.386 2.826 2.181 4.593 2.181h49.386c1.767 0 3.445-.795 4.593-2.181l23.925-29.445c1.148-1.386 1.148-3.511 0-4.897z"
                        fill="#f5f5f7"
                    />
                    <path
                        d="M44.13 40.048c-1.767 0-3.445.795-4.593 2.181L15.611 71.674c-1.148 1.386-1.148 3.511 0 4.897l23.925 29.445c1.148 1.386 2.826 2.181 4.593 2.181h49.386c1.767 0 3.445-.795 4.593-2.181l23.925-29.445c1.148-1.386 1.148-3.511 0-4.897l-23.925-29.445a6.002 6.002 0 00-4.593-2.181H44.13z"
                        fill="#fff"
                    />
                </g>
            </g>
        </svg>
    );

    return (
        <div
            {...others}
            class={cn(
                "flex flex-col items-center justify-center p-8 text-center",
                local.class
            )}
        >
            {/* 1. 图片区域 */}
            <div
                class="mb-2 flex items-center justify-center h-24 w-auto"
                style={local.imageStyle}
            >
                <Show when={local.image} fallback={<DefaultImage />}>
                    {typeof local.image === "string" ? (
                        <img
                            src={local.image}
                            alt="empty"
                            class="h-full w-auto object-contain"
                        />
                    ) : (
                        local.image
                    )}
                </Show>
            </div>

            {/* 2. 描述文字 */}
            <div class="text-[14px] text-[#00000040]">
                <Show when={local.description !== false} fallback={null}>
                    {local.description ?? "暂无数据"}
                </Show>
            </div>

            {/* 3. 底部操作区 (children) */}
            <Show when={local.children}>
                <div class="mt-4">{local.children}</div>
            </Show>
        </div>
    );
};
