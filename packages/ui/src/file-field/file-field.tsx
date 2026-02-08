import { TextField as KTextField } from "@kobalte/core/text-field";
import { splitProps, type ComponentProps, Show, createSignal } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { CloudUpload } from "lucide-solid";

//TODO 样式修改，移除 UploadCloud这种已废弃的icon

const fileFieldStyles = tv(
    {
        slots: {
            root: "flex flex-col gap-1.5 w-full antialiased",
            label: "text-sm font-medium text-slate-700 dark:text-slate-300 ml-1",
            dropzone: [
                "relative flex flex-col items-center justify-center w-full min-h-[140px]",
                "border-2 border-dashed rounded-xl transition-all cursor-pointer",
                "bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-900/10 dark:hover:bg-slate-900/20",
                "focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500",
            ],
            icon: "w-10 h-10 mb-3 text-slate-400",
            description: "text-xs text-slate-500 dark:text-slate-400 mt-1",
            errorMessage: "text-xs text-red-500 font-medium ml-1 mt-1",
        },
        variants: {
            validationState: {
                valid: {},
                invalid: {
                    dropzone:
                        "border-red-400 bg-red-50/30 dark:border-red-900/20",
                },
            },
            isDisabled: {
                true: {
                    dropzone: "opacity-50 cursor-not-allowed grayscale",
                },
            },
        },
    },
    {
        twMerge: true,
    },
);

type FileFieldVariants = VariantProps<typeof fileFieldStyles>;

export interface FileFieldProps
    extends
        Omit<ComponentProps<typeof KTextField>, "value" | "onChange">,
        FileFieldVariants {
    label?: string;
    description?: string;
    accept?: string;
    multiple?: boolean;
    onChange?: (files: File[]) => void;
}

export const FileField = (props: FileFieldProps) => {
    const [local, variantProps, others] = splitProps(
        props,
        ["label", "description", "class", "accept", "multiple", "onChange"],
        ["validationState", "isDisabled"],
    );

    const [files, setFiles] = createSignal<File[]>([]);
    const styles = () =>
        fileFieldStyles({
            validationState: variantProps.validationState,
            isDisabled: variantProps.isDisabled,
        });

    const onFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            const fileList = Array.from(target.files);
            setFiles(fileList);
            local.onChange?.(fileList);
        }
    };

    return (
        <KTextField
            class={styles().root({ class: local.class })}
            validationState={variantProps.validationState}
            disabled={variantProps.isDisabled}
            {...others}
        >
            <Show when={local.label}>
                <KTextField.Label class={styles().label()}>
                    {local.label}
                </KTextField.Label>
            </Show>

            <label class={styles().dropzone()}>
                <KTextField.Input
                    type="file"
                    class="sr-only"
                    accept={local.accept}
                    multiple={local.multiple}
                    onChange={onFileChange}
                />
                <CloudUpload class={styles().icon()} />
                <div class="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {files().length > 0
                        ? `已选择 ${files().length} 个文件`
                        : "点击或拖拽上传文件"}
                </div>
                <Show when={local.description}>
                    <p class={styles().description()}>{local.description}</p>
                </Show>
            </label>

            <KTextField.ErrorMessage class={styles().errorMessage()} />
        </KTextField>
    );
};
