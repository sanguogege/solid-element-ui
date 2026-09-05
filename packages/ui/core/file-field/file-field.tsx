import { TextField as KTextField, type TextFieldRootProps } from "@kobalte/core/text-field";
import { omit, Show, createSignal } from "solid-js";
import { CloudUpload } from "../icons";

import { cn } from "../../utils/cn";

//TODO 样式修改，移除 UploadCloud这种已废弃的icon

export interface FileFieldProps extends Omit<TextFieldRootProps, "value" | "onChange"> {
  label?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  isDisabled?: boolean;
  class?: string;
  labelClass?: string;
  dropzoneClass?: string;
  iconClass?: string;
  descriptionClass?: string;
  errorMessageClass?: string;
}

export const FileField = (props: FileFieldProps) => {
  const others = omit(
    props,
    "label",
    "description",
    "class",
    "accept",
    "multiple",
    "onChange",
    "validationState",
    "isDisabled",
    "labelClass",
    "dropzoneClass",
    "iconClass",
    "descriptionClass",
    "errorMessageClass",
  );

  const [files, setFiles] = createSignal<File[]>([]);

  const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const fileList = Array.from(target.files);
      setFiles(fileList);
      props.onChange?.(fileList);
    }
  };

  return (
    <KTextField
      class={cn("flex flex-col gap-1.5 w-full antialiased", props.class)}
      validationState={props.validationState}
      disabled={props.isDisabled}
      {...others}
    >
      <Show when={props.label}>
        <KTextField.Label
          class={cn(
            "text-sm font-medium text-slate-700 dark:text-slate-300 ml-1",
            props.labelClass,
          )}
        >
          {props.label}
        </KTextField.Label>
      </Show>

      <label
        class={cn(
          "relative flex flex-col items-center justify-center w-full min-h-35 border-2 border-dashed rounded-xl transition-all cursor-pointer bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-900/10 dark:hover:bg-slate-900/20 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500",
          props.dropzoneClass,
        )}
      >
        <KTextField.Input
          type="file"
          class="sr-only"
          accept={props.accept}
          multiple={props.multiple}
          onChange={onFileChange}
        />
        <CloudUpload class={cn("w-10 h-10 mb-3 text-slate-400", props.iconClass)} />
        <div class="text-sm font-medium text-slate-600 dark:text-slate-400">
          {files().length > 0 ? `已选择 ${files().length} 个文件` : "点击或拖拽上传文件"}
        </div>
        <Show when={props.description}>
          <p class={cn("text-xs text-slate-500 dark:text-slate-400 mt-1", props.descriptionClass)}>
            {props.description}
          </p>
        </Show>
      </label>

      <KTextField.ErrorMessage
        class={cn("text-xs text-red-500 font-medium ml-1 mt-1", props.errorMessageClass)}
      />
    </KTextField>
  );
};
