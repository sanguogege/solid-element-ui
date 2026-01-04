import { splitProps, type Component, Show } from "solid-js";
import { type TagProps } from "./setting";

export const SeTag: Component<TagProps> = (props) => {
    const [local, others] = splitProps(props, [
        "color",
        "outline",
        "closable",
        "onClose",
        "icon",
        "size",
        "class",
        "children",
    ]);

    const colorMap = {
        default: "bg-gray-100 text-gray-600 border-gray-200",
        primary: "bg-blue-50 text-blue-600 border-blue-200",
        success: "bg-green-50 text-green-600 border-green-200",
        warning: "bg-amber-50 text-amber-600 border-amber-200",
        danger: "bg-red-50 text-red-600 border-red-200",
        info: "bg-indigo-50 text-indigo-600 border-indigo-200",
    };

    const outlineMap = {
        default: "bg-transparent text-gray-600 border-gray-300",
        primary: "bg-transparent text-blue-600 border-blue-500",
        success: "bg-transparent text-green-600 border-green-500",
        warning: "bg-transparent text-amber-600 border-amber-500",
        danger: "bg-transparent text-red-600 border-red-500",
        info: "bg-transparent text-indigo-600 border-indigo-500",
    };

    const currentColors = () =>
        local.outline
            ? outlineMap[local.color || "default"]
            : colorMap[local.color || "default"];
    const sizeClass = () =>
        local.size === "sm" ? "px-1.5 py-0 text-xs" : "px-2 py-0.5 text-sm";

    return (
        <span
            {...others}
            class={`inline-flex items-center gap-1 border rounded font-medium transition-all ${currentColors()} ${sizeClass()} ${
                local.class || ""
            }`}
        >
            <Show when={local.icon}>
                <span class="flex items-center justify-center shrink-0">
                    {local.icon}
                </span>
            </Show>

            <span class="whitespace-nowrap">{local.children}</span>

            <Show when={local.closable}>
                <button
                    type="button"
                    // 这里绑定事件，由于在 setting.ts 中使用了正确的类型，这里不再报错
                    onClick={local.onClose}
                    class="ml-0.5 hover:bg-black/10 rounded-full w-4 h-4 flex items-center justify-center transition-colors outline-none shrink-0"
                    aria-label="close"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        class="w-2.5 h-2.5"
                    >
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </Show>
        </span>
    );
};
