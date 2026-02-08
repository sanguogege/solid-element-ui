import { Image as KImage } from "@kobalte/core/image";
import { splitProps, type ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const imageStyles = tv(
    {
        slots: {
            root: "relative flex items-center h-full w-full shrink-0 overflow-hidden",
            img: "h-full w-full aspect-square object-cover",
            fallback:
                "flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400",
        },
        variants: {
            radius: {
                none: { root: "rounded-none" },
                sm: { root: "rounded-sm" },
                md: { root: "rounded-md" },
                lg: { root: "rounded-lg" },
                full: { root: "rounded-full" },
            },
        },
        defaultVariants: {
            radius: "none",
        },
    },
    {
        twMerge: true,
    },
);

type ImageVariants = VariantProps<typeof imageStyles>;

export interface ImageProps
    extends ComponentProps<typeof KImage>,
        ImageVariants {
    src?: string;
    alt?: string;
    fallback?: string | Array<any> | any; // 支持自定义 fallback 内容
}

export const Image = (props: ImageProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["src", "alt", "fallback", "class"],
        ["radius"]
    );

    const styles = imageStyles({ radius: variantProps.radius });

    return (
        <KImage class={styles.root({ class: local.class })} {...others}>
            <KImage.Img src={local.src} alt={local.alt} class={styles.img()} />
            <KImage.Fallback class={styles.fallback()}>
                {local.fallback ||
                    (local.alt ? local.alt.slice(0, 2).toUpperCase() : "IMG")}
            </KImage.Fallback>
        </KImage>
    );
};
