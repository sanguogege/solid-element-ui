import { type JSX } from "solid-js";

export interface AutocompleteOption {
    value: string;
    label?: string;
    [key: string]: any;
}

/**
 * 使用 Omit 剔除原生的 onSelect 和 onInput 以避免类型冲突
 */
export interface AutocompleteProps
    extends Omit<
        JSX.InputHTMLAttributes<HTMLInputElement>,
        "onSelect" | "onInput"
    > {
    /** 候选选项数组 */
    options: AutocompleteOption[];
    /** 选中后的回调 */
    onSelect?: (option: AutocompleteOption) => void;
    /** 输入值改变的回调 (已重命名以避开原生冲突) */
    onInputChange?: (value: string) => void;
    /** 自定义过滤逻辑 */
    filterOption?: (inputValue: string, option: AutocompleteOption) => boolean;
}
