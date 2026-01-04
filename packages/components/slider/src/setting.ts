import { type JSX } from "solid-js";

export interface SliderProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    error?: boolean;
    onChange?: (value: number) => void;
    tooltip?: boolean; // 是否显示气泡提示 (2026 增强交互)
}
