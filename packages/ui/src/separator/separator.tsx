import { Separator as KSeparator } from "@kobalte/core/separator";
import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const separatorStyles = tv(
    {
        base: "bg-foreground shrink-0 transition-colors",
        variants: {
            orientation: {
                horizontal: "h-[1px] w-full my-4",
                vertical: "h-full w-[1px] mx-4",
            },
            thickness: {
                thin: "", // 默认 1px
                medium: "data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]",
                thick: "data-[orientation=horizontal]:h-[4px] data-[orientation=vertical]:w-[4px] rounded-full",
            },
            variant: {
                default: "bg-foreground",
                primary: "bg-primary",
                success: "bg-success",
                warning: "bg-warning",
                danger: "bg-danger",
            },
        },
        defaultVariants: {
            orientation: "horizontal",
            thickness: "thin",
            variant: "default",
        },
    },
    {
        twMerge: true,
    },
);

type SeparatorVariants = VariantProps<typeof separatorStyles>;

export interface SeparatorProps
    extends ComponentProps<typeof KSeparator>,
        SeparatorVariants {
    class?: string;
}

export const Separator = (props: SeparatorProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["class"],
        ["orientation", "thickness", "variant"]
    );

    return (
        <KSeparator
            class={separatorStyles({
                orientation: variantProps.orientation,
                thickness: variantProps.thickness,
                variant: variantProps.variant,
                class: local.class,
            })}
            orientation={variantProps.orientation}
            {...others}
        />
    );
};
