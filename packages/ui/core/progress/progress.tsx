import { Progress as KProgress, type ProgressRootProps } from "@kobalte/core/progress";
import { omit, Show } from "solid-js";

import { cn } from "cn";

// FIXME  进度条问题，value 直接占满

export interface ProgressProps extends Omit<ProgressRootProps, "children"> {
  label?: string;
  showValue?: boolean;
  class?: string;
  size?: string;
  radius?: string;
}

export const Progress = (props: ProgressProps) => {
  const others = omit(
    props,
    "label",
    "showValue",
    "class",
    "size",
    "radius",
  );

  return (
    <KProgress class={cn("flex flex-col gap-2 w-full antialiased", props.class)} {...others}>
      <Show when={props.label || props.showValue}>
        <div
          data-slot="progress-label-container" class="flex justify-between items-center text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <Show when={props.label}>
            <KProgress.Label>{props.label}</KProgress.Label>
          </Show>
          <Show when={props.showValue}>
            <KProgress.ValueLabel class="text-xs text-slate-500" />
          </Show>
        </div>
      </Show>

      <KProgress.Track
        data-slot="progress-track" class="h-2 w-full rounded-full bg-appoverflow-hidden"
      >
        <KProgress.Fill
          data-slot="progress-fill" class="h-full bg-primary transition-all duration-300 ease-in-out data-indeterminate:animate-progress-indeterminate"
          style={{ width: "var(--kb-progress-fill-width)" }}
        />
      </KProgress.Track>
    </KProgress>
  );
};
