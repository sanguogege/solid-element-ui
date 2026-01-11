import { tv, type VariantProps } from "tailwind-variants";

export const accordionStyles = tv({
    slots: {
        root: "",
        item: "",
        header: "",
        trigger: [
            
        ],
        content: [
         
        ],
        contentText: "",
        icon: "",
    },
    variants: {
        variant: {
            default: {},
            bordered: {
                root: "border-none space-y-2",
                item: "border rounded-lg px-4",
            },
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export type AccordionVariants = VariantProps<typeof accordionStyles>;
