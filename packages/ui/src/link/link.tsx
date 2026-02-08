import { Link as KLink } from "@kobalte/core/link";
import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const linkStyles = tv(
    {
        base: "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm disabled:pointer-events-none disabled:opacity-50",
        variants: {
            variant: {
                default:
                    "text-slate-900 underline underline-offset-4 hover:text-slate-700 dark:text-slate-100",
                primary:
                    "text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium",
                muted: "text-slate-500 hover:text-slate-600 dark:text-slate-400",
                button: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 px-4 py-2 text-sm dark:bg-slate-50 dark:text-slate-900",
            },
            underline: {
                always: "underline",
                hover: "no-underline hover:underline",
                none: "no-underline",
            },
        },
        defaultVariants: {
            variant: "default",
            underline: "hover",
        },
    },
    {
        twMerge: true,
    },
);

type LinkVariants = VariantProps<typeof linkStyles>;

export interface LinkProps extends ComponentProps<typeof KLink>, LinkVariants {
    external?: boolean;
}

export const Link = (props: LinkProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["class", "external", "children", "href"],
        ["variant", "underline"]
    );

    const styles = () =>
        linkStyles({
            variant: variantProps.variant,
            underline: variantProps.underline,
            class: local.class,
        });

    return (
        <KLink
            href={local.href}
            target={local.external ? "_blank" : undefined}
            rel={local.external ? "noopener noreferrer" : undefined}
            class={styles()}
            {...others}
        >
            {local.children}
        </KLink>
    );
};
