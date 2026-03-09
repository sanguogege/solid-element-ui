import { Link as KLink } from "@kobalte/core/link";
import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const linkStyles = tv(
    {
        base: "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm disabled:pointer-events-none disabled:opacity-50",
        variants: {
            variant: {
                default:
                    "text-main hover:text-main/80 underline-offset-4",
                primary:
                    "text-primary hover:text-primary/80 font-medium",
                muted: "text-muted hover:text-muted/80",
                button: "bg-reversal-bg text-reversal hover:reversal-bg/90 px-4 py-2 text-sm ",
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
