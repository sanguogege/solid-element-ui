import { Breadcrumbs as KBreadcrumbs } from "@kobalte/core/breadcrumbs";
import { For, type JSX, splitProps, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";
import { ChevronRight } from "lucide-solid";

// TODO 1. 定义样式
//      2. icon 支持自定义

const breadcrumbStyles = tv(
    {
        slots: {
            root: "flex w-full justify-start items-center gap-2",
            link: "text-md transition-colors text-main data-[current]:text-main/50 data-[disabled]:pointer-events-none no-underline",
            separator: "flex h-4 w-4 items-center justify-center text-main/80",
        },
    },
    {
        twMerge: true,
    },
);

const { root, link, separator } = breadcrumbStyles();

export interface BreadcrumbItem {
    title: JSX.Element;
    href?: string;
    current?: boolean;
    disabled?: boolean;
}

interface BreadcrumbsProps extends ComponentProps<typeof KBreadcrumbs> {
    items: BreadcrumbItem[];
    separatorIcon?: JSX.Element;
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
    const [local, others] = splitProps(props, [
        "items",
        "separatorIcon",
        "class",
    ]);

    return (
        <KBreadcrumbs class={root()} {...others}>
            <For each={local.items}>
                {(breadcrumb, index) => (
                    <>
                        <KBreadcrumbs.Link
                            href={breadcrumb.href}
                            current={breadcrumb.current}
                            disabled={breadcrumb.disabled}
                            class={link({ class: local.class })}
                        >
                            {breadcrumb.title}
                        </KBreadcrumbs.Link>

                        {index() < local.items.length - 1 && (
                            <span aria-hidden="true" class={separator()}>
                                {local.separatorIcon || (
                                    <ChevronRight size={16} />
                                )}
                            </span>
                        )}
                    </>
                )}
            </For>
        </KBreadcrumbs>
    );
};
