import { Tooltip as KTooltip } from "@kobalte/core/tooltip";
import { splitProps, type ComponentProps } from "solid-js";
import { tooltipVariants } from "./setting";

const styles = tooltipVariants();

// --- 扁平化组件定义 ---

export const TooltipRoot = (props: ComponentProps<typeof KTooltip>) => {
    // 默认延迟 700ms 开启，符合大多数 OS 规范
    return <KTooltip openDelay={700} closeDelay={300} {...props} />;
};

export const TooltipTrigger = KTooltip.Trigger;

export const TooltipContent = (
    props: ComponentProps<typeof KTooltip.Content>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KTooltip.Portal>
            <KTooltip.Content
                class={styles.content({ class: local.class })}
                {...others}
            >
                {local.children}
            </KTooltip.Content>
        </KTooltip.Portal>
    );
};

export const TooltipArrow = (props: ComponentProps<typeof KTooltip.Arrow>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTooltip.Arrow
            class={styles.arrow({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const Tooltip = Object.assign(TooltipRoot, {
    Trigger: TooltipTrigger,
    Content: TooltipContent,
    Arrow: TooltipArrow,
});
