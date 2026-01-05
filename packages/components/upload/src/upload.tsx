import {
    splitProps,
    type ParentComponent,
    createSignal,
    For,
} from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { type UploadProps, type UploadFile } from "./setting";

//  TODO 多添加几个upload样式

export const SeUpload: ParentComponent<UploadProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "children",
        "accept",
        "multiple",
        "disabled",
        "fileList",
        "onChange",
        "onRemove",
        "drag",
    ]);

    const [isDragOver, setIsDragOver] = createSignal(false);
    let fileInputRef: HTMLInputElement | undefined;

    // 处理文件变更
    const handleFiles = (files: FileList | null) => {
        if (!files || local.disabled) return;

        const newFiles: UploadFile[] = Array.from(files).map((file) => ({
            uid: Math.random().toString(36).slice(2),
            name: file.name,
            status: "done", // 这里简化逻辑，实际应根据上传进度修改
        }));

        const updatedList = [...(local.fileList || []), ...newFiles];
        local.onChange?.({ fileList: updatedList });
    };

    const onFileChange = (e: Event & { currentTarget: HTMLInputElement }) => {
        handleFiles(e.currentTarget.files);
        e.currentTarget.value = ""; // 重置以便再次选择同名文件
    };

    // 拖拽事件
    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (local.disabled) return;
        handleFiles(e.dataTransfer?.files || null);
    };

    return (
        <div class={cn("w-full", local.class)} {...others}>
            {/* 上传触发区域 */}
            <div
                onClick={() => !local.disabled && fileInputRef?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    !local.disabled && setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                class={cn(
                    "relative transition-all duration-200 cursor-pointer",
                    local.drag
                        ? [
                              "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-[#fafafa]",
                              "hover:border-[#4096ff]",
                              isDragOver()
                                  ? "border-[#1677ff] bg-[#e6f4ff]/30"
                                  : "border-[#d9d9d9]",
                          ]
                        : "inline-block",
                    local.disabled &&
                        "cursor-not-allowed opacity-60 hover:border-[#d9d9d9]"
                )}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    class="hidden"
                    accept={local.accept}
                    multiple={local.multiple}
                    onChange={onFileChange}
                />
                {local.children || (
                    <div class="text-[#000000d9] text-[14px]">
                        点击或拖拽文件到此处上传
                    </div>
                )}
            </div>

            {/* 文件列表渲染 */}
            <div class="mt-2 space-y-1">
                <For each={local.fileList}>
                    {(file) => (
                        <div class="group flex items-center justify-between p-1 rounded hover:bg-[#f5f5f5] transition-colors">
                            <div class="flex items-center gap-2 text-[14px] text-[#000000d9] truncate">
                                <svg
                                    class="w-4 h-4 text-[#00000073]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    />
                                </svg>
                                <span
                                    class={cn(
                                        file.status === "error" &&
                                            "text-[#ff4d4f]"
                                    )}
                                >
                                    {file.name}
                                </span>
                            </div>
                            <button
                                onClick={() => local.onRemove?.(file)}
                                class="opacity-0 group-hover:opacity-100 text-[#00000073] hover:text-[#ff4d4f] transition-all p-1"
                            >
                                <svg
                                    class="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};
