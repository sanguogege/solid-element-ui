import { Alert as KAlert, type AlertRootProps } from "@kobalte/core/alert";
import { omit } from "solid-js";

import type { JSX } from "@solidjs/web";
import { cn } from "../../utils/cn";

export interface AlertProps extends AlertRootProps {
  class?: string;
  title?: string;
  icon?: boolean;
  children?: string | JSX.Element;
  variant?: "info" | "success" | "warning" | "danger";
  contentClass?: string;
  titleClass?: string;
  childrenClass?: string;
  iconClass?: string;
}

export const Alert = (props: AlertProps) => {
  const others = omit(
    props,
    "title",
    "icon",
    "children",
    "class",
    "contentClass",
    "titleClass",
    "childrenClass",
    "iconClass",
  );

  const RenderedIcon = () => {
    if (props.icon === false) return null;
    if (typeof props.icon === "object") return props.icon;
  };

  // 5. 渲染组件
  return (
    <KAlert
      class={cn(
        "relative w-full rounded-lg border p-4 flex gap-3 antialiased text-main",
        props.class,
      )}
      {...others}
    >
      <RenderedIcon />
      <div class={cn("flex flex-col gap-1 text-left", props.contentClass)}>
        {props.title && (
          <h5 class={cn("font-semibold leading-none tracking-tight", props.titleClass)}>
            {props.title}
          </h5>
        )}
        <div class={cn("text-md leading-relaxed opacity-90", props.childrenClass)}>
          {props.children}
        </div>
      </div>
    </KAlert>
  );
};
