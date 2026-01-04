import { type JSX } from "solid-js";

export type StepStatus = "wait" | "process" | "finish" | "error";

export interface StepItem {
    title: JSX.Element;
    description?: JSX.Element;
    subTitle?: JSX.Element;
    icon?: JSX.Element;
    disabled?: boolean;
    status?: StepStatus;
}

export interface StepsProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /** 当前步骤，从 0 开始 */
    current?: number;
    /** 步骤条方向 */
    direction?: "horizontal" | "vertical";
    /** 步骤数据配置 */
    items: StepItem[];
    /** 整体状态，设置后会覆盖单个 Step 的状态计算 */
    status?: StepStatus;
    /** 尺寸 */
    size?: "default" | "small";
}
