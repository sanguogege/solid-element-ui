import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并类名工具函数
 * 1. clsx: 允许使用对象、数组、三元等逻辑拼接类名
 * 2. twMerge: 识别 Tailwind 冲突并确保最后传入的类名生效
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
