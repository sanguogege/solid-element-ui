import { type JSX } from "solid-js";

export type NotificationPlacement =
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
export type NotificationType = "info" | "success" | "warning" | "error";

export interface NotificationItem {
    id: string;
    type?: NotificationType;
    title: JSX.Element;
    description?: JSX.Element;
    duration?: number;
    placement: NotificationPlacement;
    icon?: JSX.Element;
    onClose?: () => void;
}

export interface NotificationProps
    extends Omit<NotificationItem, "id" | "placement"> {
    placement?: NotificationPlacement;
}
