import { type JSX } from "solid-js";

export interface EmptyProps extends JSX.HTMLAttributes<HTMLDivElement> {
  image?: JSX.Element;      // 自定义图片，支持图片链接或渲染元素
  imageStyle?: JSX.CSSProperties; // 图片的额外样式
  description?: JSX.Element; // 描述文字，为 false 时不显示
}
