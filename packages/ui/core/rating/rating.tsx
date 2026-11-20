import { Rating as KRating, type RatingRootProps } from "@kobalte/core/rating";
import { omit, Show, For } from "solid-js";

import { Star } from "@lucide/solid";
import { cn } from "cn";

export interface RatingGroupProps extends Omit<RatingRootProps, "children" | "class"> {
  label?: string;
  count?: number; // 星星总数，默认为 5
  class?: string;
  color?: string;
  size?: string;
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
  );

  return (
    <KRating class={cn("flex flex-col gap-1.5 antialiased", props.class)} {...others}>
      <Show when={props.label}>
        <KRating.Label
          data-slot="rating-label" class="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {props.label}
        </KRating.Label>
      </Show>

      <KRating.Control data-slot="rating-control" class="flex items-center gap-0.5">
        <For each={Array(5)}>
          {() => (
            <KRating.Item
              data-slot="rating-item" class="relative cursor-pointer transition-transform active:scale-90 focus-visible:outline-none"
            >
              <KRating.ItemControl>
                <Star />
              </KRating.ItemControl>
            </KRating.Item>
          )}
        </For>
      </KRating.Control>
    </KRating>
  );
};
