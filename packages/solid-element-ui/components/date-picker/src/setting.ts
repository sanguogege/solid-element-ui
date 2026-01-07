import { type JSX } from "solid-js";

export interface DatePickerProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onSelect" | "value"> {
    // 显式定义 value 类型，避免 string[] 或 undefined 传入 Date 构造函数
    value?: Date | string | number;
    onSelect?: (date: Date) => void;
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    error?: boolean;
}
