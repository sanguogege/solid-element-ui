import { splitProps, type Component, createSignal, For } from "solid-js";
import { cn } from "@solid-element-ui/utils/cn";
import { type TransferProps, type TransferItem } from "./setting";
import { SeCheckbox } from "../../checkbox/src/checkbox"; // 复用之前写的复选框
import { SeButton } from "../../button/src/button"; // 复用之前写的按钮

export const SeTransfer: Component<TransferProps> = (props) => {
    const [local, others] = splitProps(props, [
        "dataSource",
        "targetKeys",
        "onChange",
        "titles",
        "disabled",
        "class",
    ]);

    const [leftChecked, setLeftChecked] = createSignal<string[]>([]);
    const [rightChecked, setRightChecked] = createSignal<string[]>([]);

    // 数据分组
    const leftData = () =>
        local.dataSource.filter((item) => !local.targetKeys.includes(item.key));
    const rightData = () =>
        local.dataSource.filter((item) => local.targetKeys.includes(item.key));

    // 移动逻辑
    const moveToRight = () => {
        const nextKeys = [...local.targetKeys, ...leftChecked()];
        local.onChange?.(nextKeys);
        setLeftChecked([]);
    };

    const moveToLeft = () => {
        const nextKeys = local.targetKeys.filter(
            (key) => !rightChecked().includes(key)
        );
        local.onChange?.(nextKeys);
        setRightChecked([]);
    };

    // 单个列表渲染函数
    const TransferList = (p: {
        title: string;
        data: TransferItem[];
        checked: string[];
        onCheck: (keys: string[]) => void;
    }) => (
        <div class="flex flex-col w-50 h-75 bg-white border border-[#d9d9d9] rounded-lg overflow-hidden">
            <div class="px-3 py-2 border-b border-[#f0f0f0] bg-[#fafafa] flex items-center justify-between">
                <span class="text-[14px] font-medium text-[#000000d9]">
                    {p.title}
                </span>
                <span class="text-[12px] text-[#00000073]">
                    {p.data.length} 项
                </span>
            </div>
            <div class="flex-1 overflow-y-auto p-2 space-y-1">
                <For each={p.data}>
                    {(item) => (
                        <div
                            class={cn(
                                "flex items-center px-2 py-1 rounded transition-colors hover:bg-[#f5f5f5]",
                                item.disabled && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <SeCheckbox
                                checked={p.checked.includes(item.key)}
                                disabled={item.disabled || local.disabled}
                                onChange={(e) => {
                                    const isChecked = e.currentTarget.checked;
                                    p.onCheck(
                                        isChecked
                                            ? [...p.checked, item.key]
                                            : p.checked.filter(
                                                  (k) => k !== item.key
                                              )
                                    );
                                }}
                            >
                                <span class="text-[14px]">{item.title}</span>
                            </SeCheckbox>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );

    return (
        <div {...others} class={cn("flex items-center gap-3", local.class)}>
            {/* 左边栏 */}
            <TransferList
                title={local.titles?.[0] || "源列表"}
                data={leftData()}
                checked={leftChecked()}
                onCheck={setLeftChecked}
            />

            {/* 中间操作按钮 */}
            <div class="flex flex-col gap-2">
                <SeButton
                    size="sm"
                    disabled={leftChecked().length === 0 || local.disabled}
                    onClick={moveToRight}
                    variant={leftChecked().length > 0 ? "primary" : "text"}
                >
                    &gt;
                </SeButton>
                <SeButton
                    size="sm"
                    disabled={rightChecked().length === 0 || local.disabled}
                    onClick={moveToLeft}
                    variant={rightChecked().length > 0 ? "primary" : "text"}
                >
                    &lt;
                </SeButton>
            </div>

            {/* 右边栏 */}
            <TransferList
                title={local.titles?.[1] || "目标列表"}
                data={rightData()}
                checked={rightChecked()}
                onCheck={setRightChecked}
            />
        </div>
    );
};
