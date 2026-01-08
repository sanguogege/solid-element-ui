import { type JSX } from "solid-js";

export interface MentionOption {
    label: string;
    value: string;
}

export interface MentionsProps
    extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
    options: MentionOption[];
    prefix?: string; // 触发字符，默认 @
    value?: string;
    onChange?: (value: string) => void;
    error?: boolean;
    size?: "sm" | "md" | "lg";
}
