import { Meter as KMeter, type MeterRootProps } from "@kobalte/core/meter";
import { omit, type ComponentProps } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "cn";

// TODO 1. 格式

export interface MeterProps extends MeterRootProps {
  class?: string;
  color?: string;
  children?: JSX.Element;
}

export const Meter = Object.assign(
  (props: MeterProps) => {
    const others = omit(props, "class", "color");

    return (
      <KMeter class={cn("flex flex-col gap-2 w-full antialiased", props.class)} {...others}>
        {others.children}
      </KMeter>
    );
  },
  {
    Label: (props: ComponentProps<typeof KMeter.Label>) => {
      const others = omit(props, "class");
      return (
        <KMeter.Label
          class={cn("flex justify-between items-center text-sm font-medium text-main", props.class)}
          {...others}
        />
      );
    },
    ValueLabel: (props: ComponentProps<typeof KMeter.ValueLabel>) => {
      const others = omit(props, "class");
      return <KMeter.ValueLabel class={cn("text-xs text-slate-500", props.class)} {...others} />;
    },
    Track: (props: ComponentProps<typeof KMeter.Track>) => {
      const others = omit(props, "class");
      return (
        <KMeter.Track
          class={cn("h-2.5 w-full rounded-full bg-foreground overflow-hidden", props.class)}
          {...others}
        />
      );
    },
    Fill: (props: ComponentProps<typeof KMeter.Fill>) => {
      const others = omit(props, "class");
      // 注意：Fill 不需要手动设置宽度，Kobalte 会通过 style 注入百分比
      return (
        <KMeter.Fill
          class={cn("h-full transition-all duration-500 ease-out rounded-full", props.class)}
          {...others}
        />
      );
    },
  },
);
