import { onMount, onCleanup, createMemo, type Component } from "solid-js";
import { type AnchorLinkProps, anchorVariants, useAnchor } from "./setting";

export const AnchorLink: Component<AnchorLinkProps> = (props) => {
    const ctx = useAnchor();

    // 注册逻辑仅在浏览器端运行
    onMount(() => ctx?.registerLink(props.href));
    onCleanup(() => ctx?.unregisterLink(props.href));

    const isActive = createMemo(() => ctx?.activeLink() === props.href);
    const styles = createMemo(() => anchorVariants({ active: isActive() }));

    return (
        <a
            href={props.href}
            onClick={(e) => {
                e.preventDefault();
                ctx?.scrollTo(props.href);
            }}
            class={styles().link({ class: props.class })}
        >
            {props.title}
        </a>
    );
};
