import { type JSX } from "solid-js";

export interface TimelineItemProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 节点状态颜色 */
    color?: "default" | "primary" | "success" | "warning" | "danger" | "info";
    /** 自定义时间/标题 */
    title?: JSX.Element;
    /** 自定义节点（如图标） */
    dot?: JSX.Element;
    /** 是否是最后一项（内部逻辑控制或手动指定） */
    isLast?: boolean;
}

export interface TimelineProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /** 备用方案：支持配置化数据渲染 */
    mode?: "left" | "alternate"; // 基础版先实现常规模式
}
