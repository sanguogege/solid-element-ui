import { type JSX } from "solid-js";

export interface WatermarkProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /** 水印文字内容 */
    content?: string | string[];
    /** 水印图片地址，设置后覆盖 content */
    image?: string;
    /** 水印宽度，默认 120 */
    width?: number;
    /** 水印高度，默认 64 */
    height?: number;
    /** 旋转角度，默认 -22 */
    rotate?: number;
    /** 字体设置 */
    font?: {
        color?: string;
        fontSize?: number;
        fontWeight?: string | number;
        fontFamily?: string;
    };
    /** 间距 [x, y] */
    gap?: [number, number];
    /** 偏移 [x, y] */
    offset?: [number, number];
    /** 是否防篡改 (监控 DOM 变更) */
    antitamper?: boolean;
}
