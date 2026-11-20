import { Combobox as KCombobox, type ComboboxRootProps } from "@kobalte/core/combobox";
import { omit } from "solid-js";

import { Check, ChevronDown } from "@lucide/solid";
import { cn } from "cn";

// FIXME 缺少Description，ErrorMessage，验证

export type ComboboxProps<T> = ComboboxRootProps<T> & {
  label?: string;
  placeholder?: string;
  class?: string;
};

export const Combobox = <T extends string | object>(props: ComboboxProps<T>) => {
  const others = omit(
    props as ComboboxProps<T>,
    "label",
    "placeholder",
    "class",
  );

  return (
    <KCombobox<T> class={cn("flex flex-col gap-1.5 w-full", props.class)} {...others}>
      {props.label && (
        <KCombobox.Label
          data-slot="combobox-label" class="text-sm font-medium text-main select-none"
        >
          {props.label}
        </KCombobox.Label>
      )}

      <KCombobox.Control
        data-slot="combobox-control" class="relative flex items-center rounded-md border border-base bg-app shadow-sm transition-colors focus-within:ring-1 focus-within:ring-strong"
      >
        <KCombobox.Input
          data-slot="combobox-input" class="h-9 w-full bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted disabled:cursor-not-allowed"
          placeholder={props.placeholder}
        />
        <KCombobox.Trigger
          data-slot="combobox-trigger" class="flex h-9 w-9 items-center justify-center text-muted"
        >
          <KCombobox.Icon
            data-slot="combobox-icon" class="h-4 w-4 transition-transform duration-200 origin-center data-expanded:rotate-180"
          >
            <ChevronDown class="h-4 w-4" />
          </KCombobox.Icon>
        </KCombobox.Trigger>
      </KCombobox.Control>

      <KCombobox.Portal>
        <KCombobox.Content
          data-slot="combobox-content" class="z-50 min-w-32 overflow-hidden rounded-md border border-base bg-app text-main shadow-md animate-in zoom-in-95 data-expanded:animate-in data-closed:animate-out"
        >
          <KCombobox.Listbox data-slot="combobox-listbox" class="p-1" />
        </KCombobox.Content>
      </KCombobox.Portal>
    </KCombobox>
  );
};

export const ComboboxItem = (props: {
  item: any;
}) => {
  return (
    <KCombobox.Item
      item={props.item}
      data-slot="combobox-item" class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-highlighted:bg-foreground data-highlighted:text-main data-disabled:pointer-events-none data-disabled:opacity-50"
    >
      <KCombobox.ItemIndicator
        data-slot="combobox-item-indicator" class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
      >
        <Check size={14} />
      </KCombobox.ItemIndicator>
      <KCombobox.ItemLabel>{props.item.rawValue}</KCombobox.ItemLabel>
    </KCombobox.Item>
  );
};
