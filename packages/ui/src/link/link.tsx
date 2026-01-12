import { Link as KLink } from "@kobalte/core/link";
import { splitProps, type ComponentProps } from "solid-js";
import { linkVariants } from "./setting";

// --- 扁平化组件定义 ---

export const Link = (props: ComponentProps<typeof KLink>) => {
    const [local, others] = splitProps(props, ["class"]);
    return <KLink class={linkVariants({ class: local.class })} {...others} />;
};

// --- 聚合导出 (Namespace) ---
// 对于 Link 这种单一功能的原子组件，Namespace 通常就是组件本身
// 但为了保持一致性，我们可以创建一个聚合对象
export const LinkRoot = Object.assign(Link, {
    // 未来如果有 LinkIcon 等扩展可以挂载在这里
});
