import { type JSX } from "solid-js";

export interface TourStep {
    /** 目标元素的选择器或 HTMLElement */
    target: () => HTMLElement | null | undefined;
    /** 导览标题 */
    title: JSX.Element;
    /** 导览描述内容 */
    description: JSX.Element;
    /** 弹出位置 */
    placement?: "top" | "bottom" | "left" | "right";
}

export interface TourProps {
    /** 步骤配置 */
    steps: TourStep[];
    /** 当前步骤索引 (从 0 开始) */
    current?: number;
    /** 是否显示导览 */
    open?: boolean;
    /** 状态改变回调 */
    onChange?: (current: number) => void;
    /** 关闭回调 */
    onClose?: () => void;
    /** 完成回调 */
    onFinish?: () => void;
}
