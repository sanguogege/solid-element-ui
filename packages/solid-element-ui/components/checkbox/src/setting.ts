import { type JSX } from "solid-js";

export interface CheckboxProps
    extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: boolean;
    // 也可以添加尺寸定义
    size?: "sm" | "md" | "lg";
}
