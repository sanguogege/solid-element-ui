import {
    children,
    For,
    splitProps,
    type ParentComponent,
} from "solid-js";
import { type BreadcrumbProps } from "./setting";
import { cn } from "@/utils/cn";

export const SeBreadcrumb: ParentComponent<BreadcrumbProps> = (props) => {
    const [local, others] = splitProps(props, [
        "separator",
        "class",
        "children",
    ]);

    // 获取子组件并进行响应式处理
    const resolved = children(() => local.children);

    return (
        <nav
            aria-label="Breadcrumb"
            class={cn(
                "flex flex-wrap items-center text-gray-600 text-sm",
                local.class
            )}
            {...others}
        >
            <ol class="flex items-center">
                <For each={resolved.toArray()}>
                    {(item, index) => {
                        // 注入分隔符逻辑
                        const isLast =
                            index() === resolved.toArray().length - 1;
                        return (
                            <li class="flex items-center">
                                {item}
                                {!isLast && (
                                    <span class="mx-2 text-gray-400 select-none">
                                        {local.separator ?? "/"}
                                    </span>
                                )}
                            </li>
                        );
                    }}
                </For>
            </ol>
        </nav>
    );
};
