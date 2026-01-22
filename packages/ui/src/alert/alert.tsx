import { Alert as KAlert } from "@kobalte/core/alert";
import { splitProps, type JSX, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { Info, CircleAlert, CircleCheck, CircleX } from "lucide-solid";

const alertStyles = tv({
    slots: {
        root: "relative w-full rounded-lg border p-4 flex gap-3 antialiased text-main",
        icon: "shrink-0",
    },
    variants: {
        variant: {
            info: {
                root: "bg-primary/20 border-primary/80",
                icon: "text-primary",
            },
            success: {
                root: "bg-success/20 border-success/80 ",
                icon: "text-success",
            },
            warning: {
                root: "bg-warning/20 border-warning/80 ",
                icon: "text-warning",
            },
            danger: {
                root: "bg-danger/20 border-danger/80 ",
                icon: "text-danger",
            },
        },
    },
    defaultVariants: {
        variant: "info",
    },
});

type AlertVariants = VariantProps<typeof alertStyles>;

export interface AlertProps
    extends ComponentProps<typeof KAlert>, AlertVariants {
    title?: string;
    icon?: boolean | JSX.Element;
}

const iconMap = {
    info: Info,
    success: CircleCheck,
    warning: CircleAlert,
    danger: CircleX,
};

export const Alert = (props: AlertProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["title", "icon", "children", "class"],
        ["variant"],
    );

    const slots = alertStyles(variantProps);
    const { root, icon } = slots;

    const RenderedIcon = () => {
        if (local.icon === false) return null;
        if (typeof local.icon === "object") return local.icon;

        const Icon = iconMap[variantProps.variant || "info"];
        return <Icon size={18} class={icon()} />;
    };

    // 5. 渲染组件
    return (
        <KAlert class={`${root()} ${local.class || ""}`.trim()} {...others}>
            <RenderedIcon />
            <div class="flex flex-col gap-1 text-left">
                {local.title && (
                    <h5 class="font-semibold leading-none tracking-tight">
                        {local.title}
                    </h5>
                )}
                <div class="text-md leading-relaxed opacity-90">
                    {local.children}
                </div>
            </div>
        </KAlert>
    );
};
