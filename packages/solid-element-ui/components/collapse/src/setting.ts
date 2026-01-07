import { type JSX, type Accessor, createContext } from "solid-js";

export interface CollapseProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    activeKey?: string | string[]; // 当前激活的面板 key
    defaultActiveKey?: string | string[];
    accordion?: boolean; // 是否手风琴模式
    ghost?: boolean; // 是否幽灵模式（无背景色）
    bordered?: boolean; // 是否显示边框，默认 true
    expandIconPosition?: "left" | "right";
    onChange?: (key: string | string[]) => void;
}

export interface CollapsePanelProps extends JSX.HTMLAttributes<HTMLDivElement> {
    key: string;
    header: JSX.Element;
    extra?: JSX.Element;
    disabled?: boolean;
    showArrow?: boolean;
}

// 定义 Context 类型
export interface CollapseContextValue {
    activeKeys: Accessor<string[]>;
    toggleKey: (key: string) => void;
    expandIconPosition: Accessor<"left" | "right">;
    ghost: Accessor<boolean>;
}

export const CollapseContext = createContext<CollapseContextValue>();
