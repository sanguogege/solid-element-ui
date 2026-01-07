import { type JSX } from "solid-js";

export type ResultStatus =
    | "success"
    | "error"
    | "info"
    | "warning"
    | "404"
    | "403"
    | "500";

export interface ResultProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 状态，决定图标和默认样式 */
    status?: ResultStatus;
    /** 标题文字 */
    title?: JSX.Element;
    /** 副标题/描述文字 */
    subTitle?: JSX.Element;
    /** 自定义图标，设置后会覆盖 status 对应的图标 */
    icon?: JSX.Element;
    /** 操作区内容（通常是按钮组） */
    extra?: JSX.Element;
}
