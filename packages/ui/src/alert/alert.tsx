import { Alert as KobalteAlert } from "@kobalte/core";
import { type VariantProps } from "tailwind-variants";
import { Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-solid";
import { splitProps, type ParentProps } from "solid-js";
import { alertVariants } from "./setting";

// 定义图标映射
const icons = {
    info: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    danger: XCircle,
};

interface AlertProps extends ParentProps, VariantProps<typeof alertVariants> {
    title?: string;
    class?: string;
}

export const Alert = (props: AlertProps) => {
    // 分离 Kobalte 原生属性、自定义样式属性和其他属性
    const [local, variantProps, others] = splitProps(
        props,
        ["children", "title", "class"],
        ["intent", "size"]
    );

    const Icon = () => {
        const IconComp = icons[variantProps.intent || "info"];
        return <IconComp class="h-5 w-5 shrink-0" />;
    };

    return (
        <KobalteAlert.Root
            class={alertVariants({ ...variantProps, class: local.class })}
            {...others}
        >
            <Icon />
            <div class="flex flex-col gap-1">
                {local.title && (
                    <div class="font-semibold leading-none tracking-tight">
                        {local.title}
                    </div>
                )}
                <div class="text-sm opacity-90">{local.children}</div>
            </div>
        </KobalteAlert.Root>
    );
};
