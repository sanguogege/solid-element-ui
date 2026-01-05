import { splitProps, type ParentComponent, useContext } from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { DescriptionContext, type DescriptionItemProps } from "./setting";

export const SeDescriptionItem: ParentComponent<DescriptionItemProps> = (
    props
) => {
    const ctx = useContext(DescriptionContext);
    if (!ctx)
        throw new Error("SeDescriptionItem 必须在 SeDescription 内部使用");

    const [local, others] = splitProps(props, [
        "label",
        "span",
        "children",
        "class",
    ]);

    const span = () => local.span || 1;
    const isVertical = () => ctx.layout() === "vertical";
    const isBordered = () => ctx.bordered();

    return (
        <div
            {...others}
            style={{
                "grid-column": `span ${span()} / span ${span()}`,
            }}
            class={cn(
                "flex",
                isVertical() ? "flex-col" : "flex-row items-stretch",
                isBordered() && "border-r border-b border-[#f0f0f0]",
                local.class
            )}
        >
            {/* Label */}
            <div
                class={cn(
                    "text-[#000000d9] shrink-0 transition-all",
                    isBordered()
                        ? "bg-[#fafafa] p-4 font-medium border-r border-[#f0f0f0]"
                        : "pr-2 py-2 after:content-[':'] after:ml-0.5 font-normal",
                    isVertical() &&
                        isBordered() &&
                        "border-r-0 border-b w-full",
                    ctx.size() === "small" && "p-2 py-1.5",
                    ctx.size() === "middle" && "p-3 py-2.5"
                )}
            >
                {local.label}
            </div>

            {/* Content */}
            <div
                class={cn(
                    "flex-1 text-[#000000a6] break-words min-w-0",
                    isBordered() ? "p-4 bg-white" : "py-2 px-1",
                    ctx.size() === "small" && "p-2 py-1.5",
                    ctx.size() === "middle" && "p-3 py-2.5"
                )}
            >
                {local.children}
            </div>
        </div>
    );
};
