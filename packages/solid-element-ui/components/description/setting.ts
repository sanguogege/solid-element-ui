import { type JSX, createContext, type Accessor } from "solid-js";

/**
 * 排除原生的 title 属性以支持 JSX 结构的标题
 */
export interface DescriptionProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: JSX.Element;
    extra?: JSX.Element;
    bordered?: boolean;
    column?: number;
    layout?: "horizontal" | "vertical";
    size?: "default" | "middle" | "small";
}

export interface DescriptionItemProps
    extends JSX.HTMLAttributes<HTMLDivElement> {
    label?: JSX.Element;
    span?: number;
}

export interface DescriptionContextValue {
    bordered: Accessor<boolean>;
    layout: Accessor<"horizontal" | "vertical">;
    column: Accessor<number>;
    size: Accessor<string>;
}

export const DescriptionContext = createContext<DescriptionContextValue>();
