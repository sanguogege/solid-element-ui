import { type JSX } from "solid-js";

/**
 * 排除原生 onChange，确保业务回调返回 Date 对象
 */
export interface CalendarProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: Date;
    onChange?: (date: Date) => void;
    mode?: "month" | "year";
    dateCellRender?: (date: Date) => JSX.Element;
}

/**
 * 辅助函数：格式化日期以供比对
 */
export const formatDate = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
