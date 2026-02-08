import { Pagination as KPagination } from "@kobalte/core/pagination";
import { splitProps, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-solid";


// FIXME 样式修改，

const paginationStyles = tv(
    {
        slots: {
            root: "flex w-full justify-center antialiased",
            itemsContainer: "flex items-center gap-1",
            item: [
                "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
                "hover:bg-slate-100 hover:text-slate-900",
                "data-[selected]:bg-slate-900 data-[selected]:text-slate-50",
                "dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:data-[selected]:bg-slate-50 dark:data-[selected]:text-slate-900",
                "disabled:pointer-events-none disabled:opacity-50",
            ],
            ellipsis: "flex h-9 w-9 items-center justify-center text-slate-400",
            trigger:
                "inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800",
        },
    },
    {
        twMerge: true,
    },
);

const s = paginationStyles();

export interface PaginationProps extends ComponentProps<typeof KPagination> {}

export const Pagination = (props: PaginationProps) => {
    // 显式提取 count 以满足类型约束，同时清理 others
    const [local, others] = splitProps(props, ["class", "count"]);

    return (
        <KPagination
            class={s.root({ class: local.class })}
            count={local.count}
            {...others}
            itemComponent={(p) => (
                <KPagination.Item page={p.page} class={s.item()}>
                    {p.page}
                </KPagination.Item>
            )}
            ellipsisComponent={() => (
                <KPagination.Ellipsis class={s.ellipsis()}>
                    <Ellipsis size={16} />
                </KPagination.Ellipsis>
            )}
        >
            <div class={s.itemsContainer()}>
                <KPagination.Previous class={s.trigger()}>
                    <ChevronLeft size={16} />
                </KPagination.Previous>

                <KPagination.Items />

                <KPagination.Next class={s.trigger()}>
                    <ChevronRight size={16} />
                </KPagination.Next>
            </div>
        </KPagination>
    );
};
