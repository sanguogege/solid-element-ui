import { NavigationMenu as KNavigationMenu } from "@kobalte/core/navigation-menu";
import { splitProps, type ComponentProps } from "solid-js";
import { navigationMenuVariants } from "./setting";
import { ChevronDown } from "lucide-solid";

const styles = navigationMenuVariants();

// --- 扁平化组件定义 ---

export const NavigationMenuRoot = (
    props: ComponentProps<typeof KNavigationMenu>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KNavigationMenu
            class={styles.root({ class: local.class })}
            {...others}
        >
            {local.children}
            {/* Viewport 承载弹出内容 */}
            <KNavigationMenu.Viewport class={styles.viewport()} />
        </KNavigationMenu>
    );
};

// 修正：KNavigationMenu 下没有 List，直接使用其子组件 Menu 相关的逻辑
// 在 Kobalte 中，NavigationMenu 根组件本身就充当了容器
export const NavigationMenuMenu = KNavigationMenu.Menu;

export const NavigationMenuTrigger = (
    props: ComponentProps<typeof KNavigationMenu.Trigger>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KNavigationMenu.Trigger
            class={styles.trigger({ class: local.class })}
            {...others}
        >
            {local.children}
            <ChevronDown class={styles.triggerIcon()} aria-hidden="true" />
        </KNavigationMenu.Trigger>
    );
};

export const NavigationMenuContent = (
    props: ComponentProps<typeof KNavigationMenu.Content>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KNavigationMenu.Content
            class={styles.content({ class: local.class })}
            {...others}
        />
    );
};

// 修正：Kobalte NavigationMenu 中通常直接使用原生 <a> 或 Link 组件
// 如果需要特定样式，我们直接封装一个样式化的项
export const NavigationMenuItem = KNavigationMenu.Item;

// --- 聚合导出 (Namespace) ---

export const NavigationMenu = Object.assign(NavigationMenuRoot, {
    Item: NavigationMenuItem,
    Menu: NavigationMenuMenu,
    Trigger: NavigationMenuTrigger,
    Content: NavigationMenuContent,
    // 修正：透传 Portal 和其他核心组件
    Portal: KNavigationMenu.Portal,
    Viewport: KNavigationMenu.Viewport,
    Sub: KNavigationMenu.Sub,
});
