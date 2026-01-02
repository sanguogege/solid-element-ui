import { Show, splitProps, type ParentComponent } from "solid-js";
import { type BreadcrumbItemProps } from "./setting";
import { cn } from "@/utils/cn";

export const SeBreadcrumbItem: ParentComponent<BreadcrumbItemProps> = (
    props
) => {
    const [local, others] = splitProps(props, ["href", "class", "children"]);

    return (
        <div
            class={cn(
                "transition-colors",
                local.href
                    ? "hover:text-blue-600 cursor-pointer"
                    : "text-gray-900 font-medium",
                local.class
            )}
            {...others}
        >
            <Show when={local.href} fallback={<span>{local.children}</span>}>
                <a href={local.href} class="no-underline color-inherit">
                    {local.children}
                </a>
            </Show>
        </div>
    );
};
