import { type JSX } from "solid-js";

export interface TimePickerProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string; // 格式为 "HH:mm:ss"
    format?: string; // 默认 "HH:mm:ss"
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    size?: "sm" | "md" | "lg";
    onChange?: (time: string) => void;
}
