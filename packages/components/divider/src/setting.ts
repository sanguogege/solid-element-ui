import { type JSX } from "solid-js";

export interface DividerProps extends JSX.HTMLAttributes<HTMLDivElement> {
    direction?: "horizontal" | "vertical";
    contentPosition?: "left" | "center" | "right";
    dashed?: boolean;
    
    /** 新增：颜色属性，支持主题色名或自定义 */

    color?: "primary" | "success" | "warning" | "danger" | "info" | string;
}


