import { Breadcrumbs as KBreadcrumbs } from "@kobalte/core/breadcrumbs";
import { splitProps, type ComponentProps } from "solid-js";
import { breadcrumbVariants } from "./setting";
import { ChevronRight } from "lucide-solid";

const styles = breadcrumbVariants();

// --- 扁平化组件定义 ---

export const BreadcrumbsRoot = (props: ComponentProps<typeof KBreadcrumbs>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KBreadcrumbs class={styles.root({ class: local.class })} {...others} />
    );
};

// 修正：Kobalte 没有 List 和 Item，我们手动实现以保持样式统一
export const BreadcrumbsList = (props: ComponentProps<"ol">) => {
    const [local, others] = splitProps(props, ["class"]);
    return <ol class={styles.list({ class: local.class })} {...others} />;
};

export const BreadcrumbsItem = (props: ComponentProps<"li">) => {
    const [ others] = splitProps(props, ["class"]);
    return <li class="inline-flex items-center gap-1.5" {...others} />;
};

export const BreadcrumbsLink = (
    props: ComponentProps<typeof KBreadcrumbs.Link>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KBreadcrumbs.Link
            class={styles.link({ class: local.class })}
            {...others}
        />
    );
};

export const BreadcrumbsSeparator = (
    props: ComponentProps<typeof KBreadcrumbs.Separator>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KBreadcrumbs.Separator
            class={styles.separator({ class: local.class })}
            {...others}
        >
            {local.children ?? <ChevronRight />}
        </KBreadcrumbs.Separator>
    );
};

// --- 聚合导出 (Namespace) ---

export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
    List: BreadcrumbsList,
    Item: BreadcrumbsItem,
    Link: BreadcrumbsLink,
    Separator: BreadcrumbsSeparator,
});
