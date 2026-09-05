import { Pagination as KPagination, type PaginationRootProps } from "@kobalte/core/pagination";
import { omit } from "solid-js";
import { ChevronLeft, ChevronRight, Ellipsis } from "../icons";

import { cn } from "../../utils/cn";

// FIXME 样式修改，

export interface PaginationProps extends PaginationRootProps {
  class?: string;
  itemsContainerClass?: string;
  itemClass?: string;
  ellipsisClass?: string;
  triggerClass?: string;
}

export const Pagination = (props: PaginationProps) => {
  // 显式提取 count 以满足类型约束，同时清理 others
  const others = omit(
    props,
    "class",
    "count",
    "itemsContainerClass",
    "itemClass",
    "ellipsisClass",
    "triggerClass",
  );

  return (
    <KPagination
      class={cn("flex w-full justify-center antialiased", props.class)}
      count={props.count}
      {...others}
      itemComponent={(p) => (
        <KPagination.Item
          page={p.page}
          class={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors text-main hover:bg-foreground hover:text-muted data-current:bg-foreground data-current:text-muted disabled:pointer-events-none disabled:opacity-50",
            props.itemClass,
          )}
        >
          {p.page}
        </KPagination.Item>
      )}
      ellipsisComponent={() => (
        <KPagination.Ellipsis
          class={cn("flex h-9 w-9 items-center justify-center text-slate-400", props.ellipsisClass)}
        >
          <Ellipsis size={16} />
        </KPagination.Ellipsis>
      )}
    >
      <div class={cn("flex items-center gap-1", props.itemsContainerClass)}>
        <KPagination.Previous
          class={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md border border-light bg-transparent hover:bg-foreground",
            props.triggerClass,
          )}
        >
          <ChevronLeft size={16} />
        </KPagination.Previous>

        <KPagination.Items />

        <KPagination.Next
          class={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md border border-light bg-transparent hover:bg-foreground",
            props.triggerClass,
          )}
        >
          <ChevronRight size={16} />
        </KPagination.Next>
      </div>
    </KPagination>
  );
};
