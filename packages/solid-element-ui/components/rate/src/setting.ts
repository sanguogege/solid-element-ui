import { type JSX } from "solid-js";

export interface RateProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    count?: number; // 总星数，默认 5
    value?: number; // 当前分值
    allowHalf?: boolean; // 是否允许半星
    disabled?: boolean; // 是否只读
    allowClear?: boolean; // 是否允许再次点击清除
    onChange?: (value: number) => void;
    character?: JSX.Element; // 自定义字符，默认星星
    color?: string; // 激活颜色，默认 AntD 黄色
}
