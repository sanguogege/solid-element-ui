import { Image as KImage, type ImageRootProps } from "@kobalte/core/image";
import { omit } from "solid-js";

import { cn } from "cn";

export interface ImageProps extends ImageRootProps {
  src?: string;
  alt?: string;
  fallback?: string | Array<any>; // 支持自定义 fallback 内容
  class?: string;
  radius?: string;
  imgClass?: string;
  fallbackClass?: string;
}

export const Image = (props: ImageProps) => {
  const others = omit(
    props,
    "src",
    "alt",
    "fallback",
    "class",
    "radius",
    "imgClass",
    "fallbackClass",
  );

  return (
    <KImage
      class={cn("relative flex items-center h-full w-full shrink-0 overflow-hidden", props.class)}
      {...others}
    >
      <KImage.Img
        src={props.src}
        alt={props.alt}
        class={cn("h-full w-full aspect-square object-cover", props.imgClass)}
      />
      <KImage.Fallback
        class={cn(
          "flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400",
          props.fallbackClass,
        )}
      >
        {props.fallback || (props.alt ? props.alt.slice(0, 2).toUpperCase() : "IMG")}
      </KImage.Fallback>
    </KImage>
  );
};
