import { type JSX } from "solid-js";

export interface SwitchProps
    extends Omit<
        JSX.InputHTMLAttributes<HTMLInputElement>,
        "type" | "onChange"
    > {
    size?: "sm" | "md"; // AntD/ElPlus 通常只有大小号
    loading?: boolean; // 加载中状态
    checked?: boolean; // 受控属性
    onChange?: (checked: boolean) => void;
}
