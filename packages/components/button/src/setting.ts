import type { JSX } from "solid-js";

export interface ButtonProps
    extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "success" | "warning" | "danger" | "info" | "text";
    size?: "sm" | "md" | "lg";
    round?: boolean;
    outline?: boolean;
    loading?: boolean;
    disabled?: boolean;
}