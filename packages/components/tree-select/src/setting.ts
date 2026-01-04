import { type JSX } from "solid-js";

export interface TreeOption {
    label: string;
    value: string | number;
    children?: TreeOption[];
    disabled?: boolean;
}

export interface TreeSelectProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string | number;
    options: TreeOption[];
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    size?: "sm" | "md" | "lg";
    onChange?: (value: string | number, label: string) => void;
    defaultOpen?: boolean;
}
