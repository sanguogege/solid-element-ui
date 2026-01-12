import { Alert as KAlert } from "@kobalte/core/alert";
import { splitProps, type ComponentProps } from "solid-js";
import { alertVariants } from "./setting";
import type { VariantProps } from "tailwind-variants";

// --- 扁平化组件定义 ---

export const AlertRoot = (
    props: ComponentProps<typeof KAlert> & VariantProps<typeof alertVariants>
) => {
    const [local, others] = splitProps(props, ["class", "variant"]);
    return (
        <KAlert
            class={alertVariants({
                variant: local.variant,
                class: local.class,
            })}
            {...others}
        />
    );
};

export const AlertTitle = (props: ComponentProps<"h5">) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <h5
            class={
                (Math.max(0, 0),
                "mb-1 font-medium leading-none tracking-tight " +
                    (local.class ?? ""))
            }
            {...others}
        />
    );
};

export const AlertDescription = (props: ComponentProps<"div">) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <div
            class={"text-sm [&_p]:leading-relaxed " + (local.class ?? "")}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const Alert = Object.assign(AlertRoot, {
    Title: AlertTitle,
    Description: AlertDescription,
});
