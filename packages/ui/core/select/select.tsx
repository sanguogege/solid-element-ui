import { Select as KSelect, type SelectRootProps } from "@kobalte/core/select";
import { omit, Show, createMemo } from "solid-js";
import { ChevronDown, Check } from "../icons";

import { cn } from "../../utils/cn";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

// 重新定义接口，使 value 和 onChange 处理的是 string 类型
export interface SelectProps extends Omit<
  SelectRootProps<Option>,
  | "options"
  | "value"
  | "defaultValue"
  | "onChange"
  | "placeholder"
  | "disabled"
  | "name"
  | "multiple"
> {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  class?: string;
  size?: string;
  multiple?: boolean;
  labelClass?: string;
  triggerClass?: string;
  contentClass?: string;
  listboxClass?: string;
  itemClass?: string;
  itemIndicatorClass?: string;
  descriptionClass?: string;
}

export const Select = (props: SelectProps) => {
  const others = omit(
    props,
    "options",
    "label",
    "description",
    "placeholder",
    "class",
    "value",
    "defaultValue",
    "onChange",
    "size",
    "multiple",
    "labelClass",
    "triggerClass",
    "contentClass",
    "listboxClass",
    "itemClass",
    "itemIndicatorClass",
    "descriptionClass",
  );

  const selectedOption = createMemo(() => {
    if (props.value === undefined) return undefined;
    return props.options.find((opt) => opt.value === props.value);
  });

  const defaultOption = createMemo(() => {
    if (props.defaultValue === undefined) return undefined;
    return props.options.find((opt) => opt.value === props.defaultValue);
  });

  const handleValueChange = (opt: Option | null) => {
    if (opt === null) {
      props.onChange?.("");
      return;
    }
    props.onChange?.(opt.value);
  };

  return (
    <KSelect<Option>
      multiple={false}
      options={props.options}
      optionValue="value"
      optionTextValue="label"
      optionDisabled="disabled"
      placeholder={props.placeholder}
      value={selectedOption()}
      defaultValue={defaultOption()}
      onChange={handleValueChange}
      class={cn("flex flex-col gap-1.5 w-full", props.class)}
      {...others}
      itemComponent={(itemProps) => (
        <KSelect.Item
          item={itemProps.item}
          class={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-foreground focus:text-main data-disabled:pointer-events-none data-disabled:opacity-50",
            props.itemClass,
          )}
        >
          <KSelect.ItemIndicator
            class={cn(
              "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
              props.itemIndicatorClass,
            )}
          >
            <Check size={14} />
          </KSelect.ItemIndicator>
          <KSelect.ItemLabel>{itemProps.item.textValue}</KSelect.ItemLabel>
        </KSelect.Item>
      )}
    >
      <Show when={props.label}>
        <KSelect.Label class={cn("text-sm font-medium text-muted", props.labelClass)}>
          {props.label}
        </KSelect.Label>
      </Show>

      <KSelect.Trigger
        class={cn(
          "flex h-10 w-full text-main items-center justify-between rounded-md border border-light bg-app px-3 py-2 text-sm ring-offset-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
          props.triggerClass,
        )}
      >
        <KSelect.Value<Option>>
          {(state) => (
            <Show when={state.selectedOption()} fallback={props.placeholder}>
              {state.selectedOption()?.label}
            </Show>
          )}
        </KSelect.Value>
        <KSelect.Icon>
          <ChevronDown size={16} class="opacity-50" />
        </KSelect.Icon>
      </KSelect.Trigger>

      <KSelect.Portal>
        <KSelect.Content
          class={cn(
            "relative z-50 min-w-32 overflow-hidden rounded-md border border-light bg-app shadow-md text-main data-expanded:animate-in data-closed:animate-out",
            props.contentClass,
          )}
        >
          <KSelect.Listbox class={cn("p-1", props.listboxClass)} />
        </KSelect.Content>
      </KSelect.Portal>

      <Show when={props.description}>
        <KSelect.Description class={cn("mt-1 text-xs text-muted", props.descriptionClass)}>
          {props.description}
        </KSelect.Description>
      </Show>
    </KSelect>
  );
};
