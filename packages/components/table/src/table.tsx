import { splitProps, type Component, For, Show } from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { type TableProps } from "./setting";

export const SeTable: Component<TableProps> = (props) => {
    const [local, others] = splitProps(props, [
        "dataSource",
        "columns",
        "bordered",
        "size",
        "rowKey",
        "class",
    ]);

    const sizePadding = {
        sm: "px-2 py-2 text-sm",
        md: "px-4 py-3 text-sm",
        lg: "px-4 py-4 text-base",
    };

    return (
        <div
            {...others}
            class={cn("w-full overflow-auto bg-white rounded-lg", local.class)}
        >
            <table
                class={cn(
                    "w-full border-separate border-spacing-0 text-left text-gray-700",
                    local.bordered && "border-l border-t border-gray-200"
                )}
            >
                {/* 表头 */}
                <thead class="bg-gray-50">
                    <tr>
                        <For each={local.columns}>
                            {(col) => (
                                <th
                                    style={{
                                        width:
                                            typeof col.width === "number"
                                                ? `${col.width}px`
                                                : col.width,
                                        "text-align": col.align || "left",
                                    }}
                                    class={cn(
                                        "font-semibold text-gray-900 border-b border-r border-gray-200 transition-colors",
                                        sizePadding[local.size || "md"],
                                        !local.bordered && "border-r-0"
                                    )}
                                >
                                    {col.title}
                                </th>
                            )}
                        </For>
                    </tr>
                </thead>

                {/* 表体 */}
                <tbody>
                    <For each={local.dataSource}>
                        {(record, index) => (
                            <tr class="group hover:bg-blue-50/30 transition-colors">
                                <For each={local.columns}>
                                    {(col) => {
                                        const value = col.dataIndex
                                            ? (record as any)[col.dataIndex]
                                            : undefined;
                                        return (
                                            <td
                                                style={{
                                                    "text-align":
                                                        col.align || "left",
                                                }}
                                                class={cn(
                                                    "border-b border-r border-gray-200 transition-colors",
                                                    sizePadding[
                                                        local.size || "md"
                                                    ],
                                                    !local.bordered &&
                                                        "border-r-0"
                                                )}
                                            >
                                                <Show
                                                    when={col.render}
                                                    fallback={value}
                                                >
                                                    {col.render?.(
                                                        value,
                                                        record,
                                                        index()
                                                    )}
                                                </Show>
                                            </td>
                                        );
                                    }}
                                </For>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
        </div>
    );
};
