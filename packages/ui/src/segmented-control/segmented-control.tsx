import { Tabs as KTabs } from "@kobalte/core/tabs";
import { splitProps, type ComponentProps } from "solid-js";
import { segmentedVariants } from "./setting";

const styles = segmentedVariants();

// --- 扁平化组件定义 ---

export const SegmentedRoot = (props: ComponentProps<typeof KTabs>) => {
    const [local, others] = splitProps(props, ["class"]);
    return <KTabs class={styles.root({ class: local.class })} {...others} />;
};

export const SegmentedList = (props: ComponentProps<typeof KTabs.List>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTabs.List class={styles.list({ class: local.class })} {...others} />
    );
};

export const SegmentedTrigger = (
    props: ComponentProps<typeof KTabs.Trigger>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTabs.Trigger
            class={styles.trigger({ class: local.class })}
            {...others}
        />
    );
};

export const SegmentedContent = (
    props: ComponentProps<typeof KTabs.Content>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTabs.Content
            class={styles.content({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const SegmentedControl = Object.assign(SegmentedRoot, {
    List: SegmentedList,
    Trigger: SegmentedTrigger,
    Content: SegmentedContent,
});
