import { type JSX } from "solid-js";

export interface ColorPickerProps
    extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    size?: "sm" | "md" | "lg";
    showValue?: boolean; // 是否在右侧显示颜色十六进制值
}
