import { Breadcrumbs as KBreadcrumbs, type BreadcrumbsRootProps } from "@kobalte/core/breadcrumbs";
import { For, omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import { ChevronRight } from "../icons";

import { cn } from "../../utils/cn";

// TODO 1. 定义样式
//      2. icon 支持自定义

export interface BreadcrumbItem {
  title: JSX.Element;
  href?: string;
  current?: boolean;
  disabled?: boolean;
}

interface BreadcrumbsProps extends BreadcrumbsRootProps {
  items: BreadcrumbItem[];
  separatorIcon?: JSX.Element;
  class?: string;
  linkClass?: string;
  separatorClass?: string;
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const others = omit(props, "items", "separatorIcon", "class", "linkClass", "separatorClass");

  return (
    <KBreadcrumbs
      class={cn("flex w-full justify-start items-center gap-2", props.class)}
      {...others}
    >
      <For each={props.items}>
        {(breadcrumb, index) => (
          <>
            <KBreadcrumbs.Link
              href={breadcrumb.href}
              current={breadcrumb.current}
              disabled={breadcrumb.disabled}
              class={cn(
                "text-md transition-colors text-main data-current:text-main/50 data-disabled:pointer-events-none no-underline",
                props.linkClass,
              )}
            >
              {breadcrumb.title}
            </KBreadcrumbs.Link>

            {index() < props.items.length - 1 && (
              <span
                aria-hidden="true"
                class={cn(
                  "flex h-4 w-4 items-center justify-center text-main/80",
                  props.separatorClass,
                )}
              >
                {props.separatorIcon || <ChevronRight size={16} />}
              </span>
            )}
          </>
        )}
      </For>
    </KBreadcrumbs>
  );
};
