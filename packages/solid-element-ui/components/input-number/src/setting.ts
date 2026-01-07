import { type JSX } from "solid-js";

export interface InputNumberProps
    extends Omit<
        JSX.InputHTMLAttributes<HTMLInputElement>,
        "size" | "onChange"
    > {
    size?: "sm" | "md" | "lg";
    min?: number;
    max?: number;
    step?: number;
    precision?: number; // 小数精度
    value?: number;
    onChange?: (value: number | undefined) => void;
    error?: boolean;
}
