import { splitProps, type Component, For, Show, createMemo } from "solid-js";
import { type PaginationProps } from "./setting";

export const SePagination: Component<PaginationProps> = (props) => {
    const [local, others] = splitProps(props, [
        "current",
        "total",
        "pageSize",
        "onChange",
        "showQuickJumper",
        "showTotal",
        "size",
        "simple",
        "class",
    ]);

    const pageSize = () => local.pageSize || 10;
    const totalPage = () => Math.ceil(local.total / pageSize());

    // 核心分页算法：计算要显示的页码数组
    const pageList = createMemo(() => {
        const current = local.current;
        const total = totalPage();
        const list: (number | string)[] = [];

        if (total <= 7) {
            for (let i = 1; i <= total; i++) list.push(i);
        } else {
            list.push(1);
            if (current > 4) list.push("prev-ellipsis");

            const start = Math.max(2, current - 2);
            const end = Math.min(total - 1, current + 2);

            // 调整边缘情况确保始终显示 5 个中间页码（如果可能）
            let finalStart = start;
            let finalEnd = end;
            if (current <= 4) finalEnd = 5;
            if (current > total - 4) finalStart = total - 4;

            for (let i = finalStart; i <= finalEnd; i++) {
                if (i > 1 && i < total) list.push(i);
            }

            if (current < total - 3) list.push("next-ellipsis");
            list.push(total);
        }
        return list;
    });

    const handlePageClick = (page: number) => {
        if (page < 1 || page > totalPage() || page === local.current) return;
        local.onChange?.(page, pageSize());
    };

    const itemBaseClass = () => `
    flex items-center justify-center rounded-md border transition-all cursor-pointer select-none
    ${local.size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm"}
  `;

    return (
        <div {...others} class={`flex items-center gap-2 ${local.class || ""}`}>
            {/* 总数展示 */}
            <Show when={local.showTotal}>
                <div class="mr-2 text-sm text-gray-500">
                    {local.showTotal!(local.total, [
                        (local.current - 1) * pageSize() + 1,
                        Math.min(local.current * pageSize(), local.total),
                    ])}
                </div>
            </Show>

            {/* 上一页 */}
            <button
                disabled={local.current === 1}
                onClick={() => handlePageClick(local.current - 1)}
                class={`${itemBaseClass()} ${
                    local.current === 1
                        ? "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-200"
                        : "bg-white text-gray-600 hover:border-blue-500 hover:text-blue-500 border-gray-300"
                }`}
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            {/* 页码序列 */}
            <For each={pageList()}>
                {(page) => {
                    if (typeof page === "string") {
                        return (
                            <div
                                class={`${itemBaseClass()} border-transparent text-gray-400 cursor-default`}
                            >
                                •••
                            </div>
                        );
                    }
                    const active = () => page === local.current;
                    return (
                        <div
                            onClick={() => handlePageClick(page)}
                            class={`${itemBaseClass()} ${
                                active()
                                    ? "bg-blue-600 text-white border-blue-600 font-medium"
                                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-500 hover:text-blue-500"
                            }`}
                        >
                            {page}
                        </div>
                    );
                }}
            </For>

            {/* 下一页 */}
            <button
                disabled={local.current === totalPage()}
                onClick={() => handlePageClick(local.current + 1)}
                class={`${itemBaseClass()} ${
                    local.current === totalPage()
                        ? "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-200"
                        : "bg-white text-gray-600 hover:border-blue-500 hover:text-blue-500 border-gray-300"
                }`}
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* 快速跳转 */}
            <Show when={local.showQuickJumper}>
                <div class="flex items-center gap-2 ml-2 text-sm text-gray-600">
                    跳至
                    <input
                        type="text"
                        class="w-12 h-8 border border-gray-300 rounded-md text-center outline-none focus:border-blue-500"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                const val = parseInt(
                                    (e.target as HTMLInputElement).value
                                );
                                if (!isNaN(val)) handlePageClick(val);
                            }
                        }}
                    />
                    页
                </div>
            </Show>
        </div>
    );
};
