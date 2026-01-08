import { type JSX, type Accessor } from "solid-js";

export interface FormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {
    layout?: "horizontal" | "vertical" | "inline";
    labelCol?: { span: number }; // 仅用于 horizontal 布局
    wrapperCol?: { span: number };
    labelAlign?: "left" | "right";
}

export interface FormItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
    label?: string;
    name?: string;
    required?: boolean;
    error?: string; // 错误提示文字
    help?: string; // 辅助提示文字
}

// 定义 Context，用于 FormItem 获取 Form 的布局设置
export interface FormContextValue {
    layout: Accessor<"horizontal" | "vertical" | "inline">;
    labelCol: Accessor<{ span: number }>;
    wrapperCol: Accessor<{ span: number }>;
    labelAlign: Accessor<"left" | "right">;
}
