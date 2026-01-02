import {
    createSignal,
    onMount,
    onCleanup,
    createMemo,
    splitProps,
    type ParentComponent,
} from "solid-js";
import { type AnchorProps, AnchorContext } from "./setting";
import { cn } from "@/utils/cn";

export const SeAnchor: ParentComponent<AnchorProps> = (props) => {
    const [local, others] = splitProps(props, [
        "target",
        "offset",
        "class",
        "children",
    ]);
    const [activeLink, setActiveLink] = createSignal("");

    // 收集所有链接
    const links: string[] = [];

    const handleScroll = () => {
        const offset = local.offset ?? 0;
        let currentActive = "";

        for (const link of links) {
            const el = document.querySelector(link);
            if (el) {
                const rect = el.getBoundingClientRect();
                // 如果元素顶部达到了 offset 阈值
                if (rect.top <= offset + 10) {
                    currentActive = link;
                }
            }
        }
        setActiveLink(currentActive);
    };

    const scrollTo = (link: string) => {
        const el = document.querySelector(link);
        if (el) {
            const offset = local.offset ?? 0;
            const elementPosition =
                el.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth",
            });
        }
    };

    onMount(() => {
        const scrollTarget = local.target?.() || window;
        scrollTarget.addEventListener("scroll", handleScroll);
        // 初始化计算
        handleScroll();
        onCleanup(() =>
            scrollTarget.removeEventListener("scroll", handleScroll)
        );
    });

    return (
        <AnchorContext.Provider value={{ activeLink, scrollTo }}>
            <div
                class={cn(
                    "anchor-wrapper relative border-l-2 border-gray-200",
                    local.class
                )}
                {...others}
            >
                {/* 动态指示条 */}
                <div class="flex flex-col">{local.children}</div>
            </div>
        </AnchorContext.Provider>
    );
};
