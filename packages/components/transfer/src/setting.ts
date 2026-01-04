import { type JSX } from "solid-js";

export interface TransferItem {
    key: string;
    title: string;
    description?: string;
    disabled?: boolean;
}

export interface TransferProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    dataSource: TransferItem[]; // 数据源
    targetKeys: string[]; // 显示在右侧框中的数据 key 集合
    onChange?: (targetKeys: string[]) => void; // 移动后的回调
    titles?: [string, string]; // 标题 [左, 右]
    disabled?: boolean;
}
