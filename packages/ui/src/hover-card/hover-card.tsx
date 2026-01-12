import { HoverCard as KHoverCard } from "@kobalte/core/hover-card";
import { splitProps, type ComponentProps } from "solid-js";
import { hoverCardVariants } from "./setting";

const styles = hoverCardVariants();

// --- 扁平化组件定义 ---

export const HoverCard = KHoverCard;

export const HoverCardTrigger = KHoverCard.Trigger;

export const HoverCardContent = (
    props: ComponentProps<typeof KHoverCard.Content>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KHoverCard.Portal>
            <KHoverCard.Content
                class={styles.content({ class: local.class })}
                {...others}
            >
                {local.children}
            </KHoverCard.Content>
        </KHoverCard.Portal>
    );
};

/**
 * 这是一个可选的箭头组件，用于指向触发源
 */
export const HoverCardArrow = (
    props: ComponentProps<typeof KHoverCard.Arrow>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KHoverCard.Arrow
            class={styles.arrow({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const HoverCardRoot = Object.assign(KHoverCard, {
    Trigger: HoverCardTrigger,
    Content: HoverCardContent,
    Arrow: HoverCardArrow,
});
