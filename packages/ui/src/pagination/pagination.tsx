import { Pagination as KPagination } from "@kobalte/core/pagination";
import { splitProps, type ComponentProps } from "solid-js";
import { paginationVariants } from "./setting";
import { ChevronLeft, ChevronRight } from "lucide-solid";

const styles = paginationVariants();

// --- 扁平化组件定义 ---

export const PaginationRoot = (props: ComponentProps<typeof KPagination>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KPagination class={styles.root({ class: local.class })} {...others} />
    );
};

// 注意：Kobalte 没有 KPagination.List，我们手动封装一个样式化的容器供用户使用
export const PaginationList = (props: ComponentProps<"ul">) => {
    const [local, others] = splitProps(props, ["class"]);
    return <ul class={styles.list({ class: local.class })} {...others} />;
};

export const PaginationItem = (
    props: ComponentProps<typeof KPagination.Item>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KPagination.Item
            class={styles.item({ class: local.class })}
            {...others}
        />
    );
};

export const PaginationEllipsis = (
    props: ComponentProps<typeof KPagination.Ellipsis>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KPagination.Ellipsis
            class={styles.ellipsis({ class: local.class })}
            {...others}
        >
            ...
        </KPagination.Ellipsis>
    );
};

export const PaginationPrevious = (
    props: ComponentProps<typeof KPagination.Previous>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KPagination.Previous
            class={styles.navButton({ class: local.class })}
            {...others}
        >
            {local.children ?? <ChevronLeft class="h-4 w-4" />}
        </KPagination.Previous>
    );
};

export const PaginationNext = (
    props: ComponentProps<typeof KPagination.Next>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KPagination.Next
            class={styles.navButton({ class: local.class })}
            {...others}
        >
            {local.children ?? <ChevronRight class="h-4 w-4" />}
        </KPagination.Next>
    );
};

// --- 聚合导出 (Namespace) ---

export const Pagination = Object.assign(PaginationRoot, {
    List: PaginationList, // 使用我们自定义的样式容器
    Item: PaginationItem,
    Items: KPagination.Items, // 必须导出 Items 用于遍历渲染页码
    Ellipsis: PaginationEllipsis,
    Previous: PaginationPrevious,
    Next: PaginationNext,
});
