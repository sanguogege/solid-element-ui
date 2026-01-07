import { type JSX } from "solid-js";

export interface SegmentedOption {
    label: JSX.Element;
    value: string | number;
    disabled?: boolean;
}

export interface SegmentedProps {
    options: (string | SegmentedOption)[];
    value?: string | number;
    onChange?: (value: string | number) => void;
    size?: "sm" | "md" | "lg";
    block?: boolean; // 是否撑满父容器宽度
    class?: string;
}
