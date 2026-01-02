import { createContext, useContext, type JSX } from "solid-js";

//类型
export interface ButtonProps
    extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "success" | "warning" | "danger" | "info" | "text";
    size?: "sm" | "md" | "lg";
    round?: boolean;
    outline?: boolean;
    loading?: boolean;
    disabled?: boolean;
}

export interface ButtonGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
    // 可以统一定义组内按钮的尺寸或变体
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "success" | "warning" | "danger" | "info";
}

export interface ButtonGroupContextProps {
    size?: ButtonProps["size"];
    variant?: ButtonProps["variant"];
    outline?: ButtonProps["outline"];
    disabled?: ButtonProps["disabled"];
}


// 方法

// 创建 ButtonGroup 的 Context
export const ButtonGroupContext = createContext<ButtonGroupContextProps>();

// 导出 Hook 供 Button 组件调用
export const useButtonGroup = () => useContext(ButtonGroupContext);