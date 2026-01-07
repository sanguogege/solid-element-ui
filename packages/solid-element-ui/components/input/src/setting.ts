import { type JSX } from "solid-js";

/**
 * 排除原生 input 属性中会产生冲突的定义
 * prefix 在原生中是 string，我们要改为 JSX.Element
 * size 在原生中是 number，我们要改为自定义字符串
 */
export interface InputProps
    extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
    size?: "sm" | "md" | "lg";
    error?: boolean;
    prefix?: JSX.Element;
    suffix?: JSX.Element;
}
