import { Image as KImage } from "@kobalte/core/image";
import { splitProps, type ComponentProps } from "solid-js";
import { imageVariants } from "./setting";

const styles = imageVariants();

// --- 扁平化组件定义 ---

export const ImageRoot = (props: ComponentProps<typeof KImage>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KImage class={styles.root({ class: local.class })} {...others} />
    );
};

export const ImageImg = (props: ComponentProps<typeof KImage.Img>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KImage.Img class={styles.img({ class: local.class })} {...others} />
    );
};

export const ImageFallback = (
    props: ComponentProps<typeof KImage.Fallback>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KImage.Fallback
            class={styles.fallback({ class: local.class })}
            {...others}
        />
    );
};

// --- 聚合导出 (Namespace) ---

export const Image = Object.assign(ImageRoot, {
    Img: ImageImg,
    Fallback: ImageFallback,
});
