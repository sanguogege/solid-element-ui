import {
    splitProps,
    type Component,
    createSignal,
    Show,
    createMemo,
} from "solid-js";
import { cn } from "@/utils/cn";
import { type AvatarProps } from "./setting";

export const SeAvatar: Component<AvatarProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "src",
        "alt",
        "shape",
        "size",
        "icon",
        "children",
        "gap",
    ]);

    const [isError, setIsError] = createSignal(false);

    // 预定义的尺寸映射
    const sizeClasses = {
        sm: "w-6 h-6 text-xs",
        md: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base",
    };

    // 处理自定义数字尺寸
    const customStyle = createMemo(() => {
        if (typeof local.size === "number") {
            return {
                width: `${local.size}px`,
                height: `${local.size}px`,
                "line-height": `${local.size}px`,
                "font-size": `${local.size / 2}px`,
            };
        }
        return {};
    });

    return (
        <span
            {...others}
            class={cn(
                "relative inline-flex items-center justify-center overflow-hidden bg-[#ccc] text-white whitespace-nowrap align-middle shrink-0",
                local.shape === "square" ? "rounded-md" : "rounded-full",
                typeof local.size !== "number" &&
                    sizeClasses[local.size ?? "md"],
                local.class
            )}
            style={customStyle()}
        >
            <Show
                when={local.src && !isError()}
                fallback={
                    <div class="flex items-center justify-center w-full h-full">
                        {local.icon || local.children || (
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                class="w-2/3 h-2/3"
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        )}
                    </div>
                }
            >
                <img
                    src={local.src}
                    alt={local.alt}
                    class="block w-full h-full object-cover"
                    onError={() => setIsError(true)}
                />
            </Show>
        </span>
    );
};
