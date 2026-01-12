import { Collapsible as KCollapsible } from "@kobalte/core/collapsible";
import { splitProps, type ComponentProps } from "solid-js";
import { collapsibleVariants } from "./setting";
import { ChevronDown } from "lucide-solid";

const styles = collapsibleVariants();

// --- 扁平化组件定义 ---

export const CollapsibleRoot = KCollapsible;

export const CollapsibleTrigger = (
    props: ComponentProps<typeof KCollapsible.Trigger>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KCollapsible.Trigger
            class={styles.trigger({ class: local.class })}
            {...others}
        >
            {local.children}
            <ChevronDown class={styles.icon()} />
        </KCollapsible.Trigger>
    );
};

export const CollapsibleContent = (
    props: ComponentProps<typeof KCollapsible.Content>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KCollapsible.Content
            class={styles.content({ class: local.class })}
            {...others}
        >
            <div class="pb-4 pt-0">{local.children}</div>
        </KCollapsible.Content>
    );
};

// --- 聚合导出 (Namespace) ---

export const Collapsible = Object.assign(CollapsibleRoot, {
    Trigger: CollapsibleTrigger,
    Content: CollapsibleContent,
});
