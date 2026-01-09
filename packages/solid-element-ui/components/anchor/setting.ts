import { createContext, useContext, type JSX } from "solid-js";
import { isServer } from "solid-js/web";
import { tv, type VariantProps } from "tailwind-variants";

// 1. 定义样式
export const anchorVariants = tv({
    slots: {
        base: "relative border-l-2 border-gray-200 ml-0.5 h-fit",
        list: "flex flex-col relative",
        link: "block py-1 pl-4 text-sm transition-all border-l-2 -ml-[2px] no-underline cursor-pointer",
    },
    variants: {
        active: {
            true: { link: "text-primary border-primary font-medium" },
            false: {
                link: "text-gray-500 border-transparent hover:text-gray-700",
            },
        },
    },
});

// 2. 【关键】导出 Context 接口
export interface AnchorContextValue {
    activeLink: () => string;
    scrollTo: (link: string) => void;
    registerLink: (link: string) => void;
    unregisterLink: (link: string) => void;
}

// 3. 导出 Props 接口
export interface AnchorProps extends JSX.HTMLAttributes<HTMLDivElement> {
    target?: () => HTMLElement | Window;
    offset?: number;
    children?: JSX.Element;
}

export interface AnchorLinkProps {
    href: string;
    title: JSX.Element;
    class?: string;
}

// 4. 导出 Context 实例
export const AnchorContext = createContext<AnchorContextValue>();

// 5. 导出 Hook
export const useAnchor = () => {
    const ctx = useContext(AnchorContext);
    if (!ctx && !isServer) {
        console.warn("SeAnchorLink 必须在 SeAnchor 内部使用");
    }
    return ctx;
};
