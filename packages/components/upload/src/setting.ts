import { type JSX } from "solid-js";

export interface UploadFile {
    uid: string;
    name: string;
    status?: "uploading" | "done" | "error" | "removed";
    url?: string;
    percent?: number;
}

export interface UploadProps
    extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    directory?: boolean;
    fileList?: UploadFile[];
    onChange?: (info: { fileList: UploadFile[] }) => void;
    onRemove?: (file: UploadFile) => void;
    drag?: boolean; // 是否启用拖拽模式
}
