// src/components/affix/settings.ts
import { JSX } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";

export const affixVariants = cva("transition-all duration-300", {
    variants: {
        fixed: {
            true: "fixed z-[1000] drop-shadow-md", // 固定时的样式，仿 AntD 阴影
            false: "relative",
        },
    },
    defaultVariants: {
        fixed: false,
    },
});

export interface AffixProps extends VariantProps<typeof affixVariants> {
    offsetTop?: number;
    offsetBottom?: number;
    target?: () => HTMLElement | Window | null;
    onChange?: (fixed: boolean) => void;
    children?: JSX.Element;
    class?: string;
    style?: JSX.CSSProperties;
}

export interface AffixState {
    affixStyle?: JSX.CSSProperties;
    placeholderStyle?: JSX.CSSProperties;
    isFixed: boolean;
}
