import { Pagination as KPagination, type PaginationRootProps } from "@kobalte/core/pagination";
import { omit } from "solid-js";

import { ChevronLeft, ChevronRight, Ellipsis } from "@lucide/solid";
import { cn } from "cn";

// FIXME 样式修改，

export interface PaginationProps extends PaginationRootProps {
  class?: string;
}

export const Pagination = (props: PaginationProps) => {
  // 显式提取 count 以满足类型约束，同时清理 others
  const others = omit(
    props,
    "class",
    "count",
  );

  return (
    <KPagination
      class={cn("flex w-full justify-center antialiased", props.class)}
      count={props.count}
      {...others}
      itemComponent={(p) => (
        <KPagination.Item
          page={p.page}
          data-slot="pagination-item" class="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors text-main hover:bg-foreground hover:text-muted data-current:bg-foreground data-current:text-muted disabled:pointer-events-none disabled:opacity-50"
        >
          {p.page}
        </KPagination.Item>
      )}
      ellipsisComponent={() => (
        <KPagination.Ellipsis
          data-slot="pagination-ellipsis" class="flex h-9 w-9 items-center justify-center text-slate-400"
        >
          <Ellipsis size={16} />
        </KPagination.Ellipsis>
      )}
    >
      <div data-slot="pagination-items-container" class="flex items-center gap-1">
        <KPagination.Previous
          data-slot="pagination-trigger" class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-light bg-transparent hover:bg-foreground"
        >
          <ChevronLeft size={16} />
        </KPagination.Previous>

        <KPagination.Items />

        <KPagination.Next
          data-slot="pagination-trigger" class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-light bg-transparent hover:bg-foreground"
        >
          <ChevronRight size={16} />
        </KPagination.Next>
      </div>
    </KPagination>
  );
};
