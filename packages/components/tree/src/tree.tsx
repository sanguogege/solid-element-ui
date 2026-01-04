import {
    splitProps,
    createSignal,
    For,
    Show,
    type Component,
    createMemo,
    type JSX,
} from "solid-js";
import { type TreeProps, type TreeData } from "./setting";

// --- 内部递归子项组件 ---
const TreeNode: Component<{
    node: TreeData;
    level: number;
    expandedKeys: string[];
    onToggle: (key: string) => void;
    onSelect: (key: string, node: TreeData) => void;
    renderTitle?: (node: TreeData) => JSX.Element;
}> = (props) => {
    const hasChildren = () =>
        !!props.node.children && props.node.children.length > 0;
    const isExpanded = () => props.expandedKeys.includes(props.node.key);

    return (
        <div class="select-none">
            {/* 节点主体 */}
            <div
                class={`flex items-center py-1 px-2 rounded-md cursor-pointer transition-colors hover:bg-gray-100 ${
                    props.node.disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{ "padding-left": `${props.level * 16 + 8}px` }}
                onClick={() =>
                    !props.node.disabled &&
                    props.onSelect(props.node.key, props.node)
                }
            >
                {/* 展开收起图标 */}
                <div
                    class="w-5 h-5 flex items-center justify-center mr-1 text-gray-400 hover:text-gray-600 transition-transform"
                    style={{
                        transform: isExpanded()
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (hasChildren()) props.onToggle(props.node.key);
                    }}
                >
                    <Show when={hasChildren()}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            class="w-3.5 h-3.5"
                        >
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </Show>
                </div>

                {/* 自定义图标 */}
                <Show when={props.node.icon}>
                    <span class="mr-2 flex items-center shrink-0">
                        {props.node.icon}
                    </span>
                </Show>

                {/* 标题 */}
                <div class="text-sm text-gray-700 truncate">
                    <Show when={props.renderTitle} fallback={props.node.title}>
                        {props.renderTitle!(props.node)}
                    </Show>
                </div>
            </div>

            {/* 子节点递归 */}
            <Show when={hasChildren() && isExpanded()}>
                <div class="overflow-hidden">
                    <For each={props.node.children}>
                        {(child) => (
                            <TreeNode
                                node={child}
                                level={props.level + 1}
                                expandedKeys={props.expandedKeys}
                                onToggle={props.onToggle}
                                onSelect={props.onSelect}
                                renderTitle={props.renderTitle}
                            />
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};

// --- 主组件 ---
export const SeTree: Component<TreeProps> = (props) => {
    const [local, others] = splitProps(props, [
        "data",
        "defaultExpandedKeys",
        "onSelect",
        "onExpand",
        "defaultExpandAll",
        "renderTitle",
        "class",
    ]);

    // 管理展开状态
    const getAllKeys = (data: TreeData[]): string[] => {
        let keys: string[] = [];
        data.forEach((item) => {
            keys.push(item.key);
            if (item.children) keys = [...keys, ...getAllKeys(item.children)];
        });
        return keys;
    };

    const initialKeys = local.defaultExpandAll
        ? getAllKeys(local.data)
        : local.defaultExpandedKeys || [];

    const [expandedKeys, setExpandedKeys] = createSignal<string[]>(initialKeys);

    const handleToggle = (key: string) => {
        const current = expandedKeys();
        const next = current.includes(key)
            ? current.filter((k) => k !== key)
            : [...current, key];

        setExpandedKeys(next);
        local.onExpand?.(next);
    };

    return (
        <div {...others} class={`w-full py-2 ${local.class || ""}`}>
            <For each={local.data}>
                {(node) => (
                    <TreeNode
                        node={node}
                        level={0}
                        expandedKeys={expandedKeys()}
                        onToggle={handleToggle}
                        onSelect={(key, n) => local.onSelect?.(key, n)}
                        renderTitle={local.renderTitle}
                    />
                )}
            </For>
        </div>
    );
};
