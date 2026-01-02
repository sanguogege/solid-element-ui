import { type JSX } from "solid-js";

// 定义组件的 Props 类型
export interface AffixProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    // 可以在这里添加你自定义的属性，例如：
    // variant?: "primary" | "secondary";
    // size?: "sm" | "md" | "lg";
}

// 导出其他的配置常量，例如默认样式映射等...
