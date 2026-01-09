import {
    createSignal,
    onMount,
    onCleanup,
    splitProps,
    createMemo,
} from "solid-js";
import { isServer } from "solid-js/web";
import {
    type AnchorProps,
    type AnchorContextValue, // 这里引用了接口
    AnchorContext,
    anchorVariants,
} from "./setting";

export const Anchor = (props: AnchorProps) => {
    const [local, others] = splitProps(props, [
        "target",
        "offset",
        "class",
        "children",
    ]);
    const [activeLink, setActiveLink] = createSignal("");
    const [links, setLinks] = createSignal<string[]>([]);

    const styles = createMemo(() => anchorVariants());

    const handleScroll = () => {
        if (isServer) return;
        const offset = local.offset ?? 0;
        let currentActive = "";
        for (const link of links()) {
            try {
                const el = document.querySelector(link);
                if (el instanceof HTMLElement) {
                    if (el.getBoundingClientRect().top <= offset + 20) {
                        currentActive = link;
                    }
                }
            } catch (e) {}
        }
        setActiveLink(currentActive);
    };

    const scrollTo = (link: string) => {
        if (isServer) return;
        const el = document.querySelector(link);
        if (el instanceof HTMLElement) {
            const offset = local.offset ?? 0;
            const scrollTarget = local.target?.() || window;
            const top =
                el.getBoundingClientRect().top + window.scrollY - offset;
            scrollTarget.scrollTo({ top, behavior: "smooth" });
            setActiveLink(link);
        }
    };

    onMount(() => {
        const target = local.target?.() || window;
        target.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        onCleanup(() => target.removeEventListener("scroll", handleScroll));
    });

    // 显式标注类型以确保匹配
    const contextValue: AnchorContextValue = {
        activeLink,
        scrollTo,
        registerLink: (link) => setLinks((p) => [...new Set([...p, link])]),
        unregisterLink: (link) => setLinks((p) => p.filter((l) => l !== link)),
    };

    return (
        <AnchorContext.Provider value={contextValue}>
            <div {...others} class={styles().base({ class: local.class })}>
                <div class={styles().list()}>{local.children}</div>
            </div>
        </AnchorContext.Provider>
    );
};
