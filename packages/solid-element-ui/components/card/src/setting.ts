import { type JSX } from "solid-js";

/**
 * 排除原生的 title，以便支持 JSX.Element 类型的标题
 */
export interface CardProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: JSX.Element;
    extra?: JSX.Element;
    cover?: JSX.Element;
    hoverable?: boolean;
    bordered?: boolean;
    loading?: boolean;
    actions?: JSX.Element[];
    size?: "default" | "small";
}
