import { type JSX } from "solid-js";

// 定义组件的 Props 类型
// TODO: 根据需要修改继承的 HTML 元素类型
export interface AffixProps extends JSX.HTMLAttributes<HTMLDivElement> {
    offsetTop?: number;
    offsetBottom?: number;
    offsetLeft?: number; // 新增：左侧偏移
    offsetRight?: number; // 新增：右侧偏移
    target?: () => HTMLElement | Window;
    zIndex?: number; // 建议把 zIndex 也暴露出来
}

// 导出其他的配置常量，例如默认样式映射等...
