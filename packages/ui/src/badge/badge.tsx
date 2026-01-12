import { Badge as KBadge } from "@kobalte/core/badge";
import { splitProps, type ComponentProps } from "solid-js";
import { badgeVariants } from "./setting";
import type { VariantProps } from "tailwind-variants";

export interface BadgeProps
    extends ComponentProps<typeof KBadge>,
        VariantProps<typeof badgeVariants> {}

export const Badge = (props: BadgeProps) => {
    const [local, others] = splitProps(props, ["class", "variant"]);

    return (
        <KBadge
            class={badgeVariants({
                variant: local.variant,
                class: local.class,
            })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const BadgeRoot = Badge;
