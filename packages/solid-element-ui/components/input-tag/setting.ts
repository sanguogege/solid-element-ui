import { type JSX } from "solid-js";

export interface InputTagProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string[];
    onChange?: (tags: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    size?: "sm" | "md" | "lg";
}
