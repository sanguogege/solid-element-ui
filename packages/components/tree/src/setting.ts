import { type JSX } from "solid-js";

export interface TreeData {
    title: string;
    key: string;
    children?: TreeData[];
    disabled?: boolean;
    icon?: JSX.Element;
}

export interface TreeProps {
    /** 树的数据源 */
    data: TreeData[];
    /** 默认展开的节点 key 数组 */
    defaultExpandedKeys?: string[];
    /** 选中节点时的回调 */
    onSelect?: (key: string, node: TreeData) => void;
    /** 展开/收起节点时的回调 */
    onExpand?: (keys: string[]) => void;
    /** 是否默认展开所有节点 */
    defaultExpandAll?: boolean;
    /** 自定义渲染标题 */
    renderTitle?: (node: TreeData) => JSX.Element;
    /** 容器自定义类名 */
    class?: string;
}
