import { TextField as KSearch, type TextFieldRootProps } from "@kobalte/core/text-field";
import { omit, Show } from "solid-js";

import { SearchIcon, CircleX } from "@lucide/solid";
import { cn } from "cn";

export interface SearchProps extends Omit<TextFieldRootProps, "class"> {
  class?: string;
  placeholder?: string;
  allowClear?: boolean;
  onClear?: () => void;
  size?: string;
  ringColor?: string;
}

export const Search = (props: SearchProps) => {
  const others = omit(
    props,
    "class",
    "placeholder",
    "allowClear",
    "onClear",
    "value",
    "onChange",
    "size",
    "ringColor",
  );

  return (
    <KSearch
      class={cn("relative flex flex-col gap-1.5 w-full", props.class)}
      value={props.value}
      onChange={props.onChange}
      {...others}
    >
      <div data-slot="search-input-wrapper" class="relative flex items-center transition-all">
        <SearchIcon
          data-slot="search-icon" class="absolute left-3 h-4 w-4 text-main pointer-events-none"
        />
        <KSearch.Input
          data-slot="search-input" class="flex h-10 w-full rounded-md border border-light bg-app px-9 py-2 text-sm ring-offset-app file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={props.placeholder ?? "搜索..."}
        />
        <Show when={props.allowClear && props.value}>
          <button
            onClick={() => props.onClear?.()}
            data-slot="search-clear" class="absolute right-3 h-4 w-4 text-main hover:text-muted cursor-pointer transition-colors"
          >
            <CircleX class="text-muted" />
          </button>
        </Show>
      </div>
    </KSearch>
  );
};
