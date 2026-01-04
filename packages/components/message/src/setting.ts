import { type JSX } from "solid-js";

export type MessageType = "info" | "success" | "warning" | "error" | "loading";

export interface MessageItem {
    id: string;
    type: MessageType;
    content: JSX.Element;
    duration?: number; // 持续时间，单位 ms
}

export interface MessageProps {
    /** 消息内容 */
    content: JSX.Element;
    /** 消息类型 */
    type?: MessageType;
    /** 自动关闭延时 */
    duration?: number;
}
