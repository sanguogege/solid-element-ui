import { Combobox as KCombobox, type ComboboxRootProps } from "@kobalte/core/combobox";
import { omit } from "solid-js";
import { Check, ChevronDown } from "../icons";

import { cn } from "../../utils/cn";

// FIXME 缺少Description，ErrorMessage，验证

export type ComboboxProps<T> = ComboboxRootProps<T> & {
  label?: string;
  placeholder?: string;
  class?: string;
  labelClass?: string;
  controlClass?: string;
  inputClass?: string;
  triggerClass?: string;
  contentClass?: string;
  listboxClass?: string;
  itemClass?: string;
  itemIndicatorClass?: string;
  iconClass?: string;
};

export const Combobox = <T extends string | object>(props: ComboboxProps<T>) => {
  const others = omit(
    props as ComboboxProps<T>,
    "label",
    "placeholder",
    "class",
    "labelClass",
    "controlClass",
    "inputClass",
    "triggerClass",
    "contentClass",
    "listboxClass",
    "itemClass",
    "itemIndicatorClass",
    "iconClass",
  );

  return (
    <KCombobox<T> class={cn("flex flex-col gap-1.5 w-full", props.class)} {...others}>
      {props.label && (
        <KCombobox.Label
          class={cn(
            "text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none",
            props.labelClass,
          )}
        >
          {props.label}
        </KCombobox.Label>
      )}

      <KCombobox.Control
        class={cn(
          "relative flex items-center rounded-md border border-base bg-app shadow-sm transition-colors focus-within:ring-1 focus-within:ring-zinc-950 dark:focus-within:ring-zinc-300",
          props.controlClass,
        )}
      >
        <KCombobox.Input
          class={cn(
            "h-9 w-full bg-transparent px-3 py-1 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed",
            props.inputClass,
          )}
          placeholder={props.placeholder}
        />
        <KCombobox.Trigger
          class={cn("flex h-9 w-9 items-center justify-center text-zinc-500", props.triggerClass)}
        >
          <KCombobox.Icon
            class={cn(
              "h-4 w-4 transition-transform duration-200 origin-center data-expanded:rotate-180",
              props.iconClass,
            )}
          >
            <ChevronDown class="h-4 w-4" />
          </KCombobox.Icon>
        </KCombobox.Trigger>
      </KCombobox.Control>

      <KCombobox.Portal>
        <KCombobox.Content
          class={cn(
            "z-50 min-w-32 overflow-hidden rounded-md border border-base bg-app text-zinc-950 shadow-md animate-in zoom-in-95 dark:text-zinc-50 data-expanded:animate-in data-closed:animate-out",
            props.contentClass,
          )}
        >
          <KCombobox.Listbox class={cn("p-1", props.listboxClass)} />
        </KCombobox.Content>
      </KCombobox.Portal>
    </KCombobox>
  );
};

export const ComboboxItem = (props: {
  item: any;
  itemClass?: string;
  itemIndicatorClass?: string;
}) => {
  return (
    <KCombobox.Item
      item={props.item}
      class={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900 data-disabled:pointer-events-none data-disabled:opacity-50 dark:data-highlighted:bg-zinc-800 dark:data-highlighted:text-zinc-50",
        props.itemClass,
      )}
    >
      <KCombobox.ItemIndicator
        class={cn(
          "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
          props.itemIndicatorClass,
        )}
      >
        <Check size={14} />
      </KCombobox.ItemIndicator>
      <KCombobox.ItemLabel>{props.item.rawValue}</KCombobox.ItemLabel>
    </KCombobox.Item>
  );
};
