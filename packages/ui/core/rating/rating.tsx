import { Rating as KRating, type RatingRootProps } from "@kobalte/core/rating";
import { omit, Show, For } from "solid-js";
import { StarIcon } from "../icons";

import { cn } from "../../utils/cn";

export interface RatingGroupProps extends Omit<RatingRootProps, "children" | "class"> {
  label?: string;
  count?: number; // 星星总数，默认为 5
  class?: string;
  color?: string;
  size?: string;
  labelClass?: string;
  controlClass?: string;
  itemClass?: string;
  itemIndicatorClass?: string;
}

/**
 * RatingGroup 高度封装版
 * 自动处理星星循环、高亮逻辑及表单集成
 */
export const RatingGroup = (props: RatingGroupProps) => {
  const others = omit(
    props,
    "label",
    "count",
    "class",
    "color",
    "size",
    "labelClass",
    "controlClass",
    "itemClass",
    "itemIndicatorClass",
  );

  return (
    <KRating class={cn("flex flex-col gap-1.5 antialiased", props.class)} {...others}>
      <Show when={props.label}>
        <KRating.Label
          class={cn("text-sm font-medium text-slate-700 dark:text-slate-300", props.labelClass)}
        >
          {props.label}
        </KRating.Label>
      </Show>

      <KRating.Control class={cn("flex items-center gap-0.5", props.controlClass)}>
        <For each={Array(5)}>
          {() => (
            <KRating.Item
              class={cn(
                "relative cursor-pointer transition-transform active:scale-90 focus-visible:outline-none",
                props.itemClass,
              )}
            >
              <KRating.ItemControl>
                <StarIcon />
              </KRating.ItemControl>
            </KRating.Item>
          )}
        </For>
      </KRating.Control>
    </KRating>
  );
};
