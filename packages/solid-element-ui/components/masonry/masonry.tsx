import { splitProps, type Component, For, createMemo } from "solid-js";
import { type MasonryProps } from "./setting";

export const SeMasonry: Component<MasonryProps> = (props) => {
    const [local, others] = splitProps(props, [
        "items",
        "columns",
        "gap",
        "renderItem",
        "class",
    ]);

    const columnsCount = () => local.columns || 3;
    const gapSize = () => local.gap ?? 4;

    // 核心逻辑：将数据分配到各列中
    const columnData = createMemo(() => {
        const cols: any[][] = Array.from({ length: columnsCount() }, () => []);
        local.items.forEach((item, index) => {
            // 简单分配算法：按顺序轮询分配
            // 如果需要更精准的高度分配，通常需要等图片加载后测量 DOM，这在 2026 年通常交由 CSS 处理
            cols[index % columnsCount()].push(item);
        });
        return cols;
    });

    return (
        <div
            {...others}
            class={`flex w-full items-start gap-${gapSize()} ${
                local.class || ""
            }`}
        >
            <For each={columnData()}>
                {(columnItems) => (
                    <div class={`flex flex-1 flex-col gap-${gapSize()}`}>
                        <For each={columnItems}>
                            {(item, index) => (
                                <div class="animate-in fade-in zoom-in-95 duration-500">
                                    {local.renderItem(item, index())}
                                </div>
                            )}
                        </For>
                    </div>
                )}
            </For>
        </div>
    );
};
