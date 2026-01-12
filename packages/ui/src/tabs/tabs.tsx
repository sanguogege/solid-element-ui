import { Tabs as KTabs } from "@kobalte/core/tabs";
import { splitProps, type ComponentProps } from "solid-js";
import { tabsVariants } from "./setting";

const styles = tabsVariants();

// --- 扁平化组件定义 ---

export const TabsRoot = (props: ComponentProps<typeof KTabs>) => {
    const [local, others] = splitProps(props, ["class"]);
    return <KTabs class={styles.root({ class: local.class })} {...others} />;
};

export const TabsList = (props: ComponentProps<typeof KTabs.List>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KTabs.List class={styles.list({ class: local.class })} {...others}>
            {local.children}
            {/* 这里的 Indicator 是可选的，如果样式中用了 border-b，则不需要此组件 */}
            <KTabs.Indicator class={styles.indicator()} />
        </KTabs.List>
    );
};

export const TabsTrigger = (props: ComponentProps<typeof KTabs.Trigger>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTabs.Trigger
            class={styles.trigger({ class: local.class })}
            {...others}
        />
    );
};

export const TabsContent = (props: ComponentProps<typeof KTabs.Content>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KTabs.Content
            class={styles.content({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const Tabs = Object.assign(TabsRoot, {
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
    Indicator: KTabs.Indicator,
});
