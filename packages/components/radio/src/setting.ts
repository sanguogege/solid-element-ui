import { type JSX, type Accessor, createContext } from "solid-js";

// Radio 基础属性
export interface RadioProps
    extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    value?: string | number;
}

// RadioGroup 属性：排除原生 onChange 冲突
export interface RadioGroupProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string | number;
    onChange?: (value: string | number) => void;
    disabled?: boolean;
    name?: string;
}

// 定义 Context 接口
export interface RadioGroupContextValue {
    value: Accessor<string | number | undefined>;
    onChange: (val: string | number) => void;
    name: Accessor<string | undefined>;
    disabled: Accessor<boolean>;
}

// 创建并导出 Context
export const RadioGroupContext = createContext<RadioGroupContextValue>();
