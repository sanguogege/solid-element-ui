import { TextField as KTextField, type TextFieldRootProps } from "@kobalte/core/text-field";
import { omit, Show, createSignal } from "solid-js";

import { CloudUpload } from "@lucide/solid";
import { cn } from "cn";

//TODO 样式修改，移除 UploadCloud这种已废弃的icon

export interface FileFieldProps extends Omit<TextFieldRootProps, "value" | "onChange"> {
  label?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  isDisabled?: boolean;
  class?: string;
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
          data-slot="file-field-label" class="text-sm font-medium text-muted ml-1"
        >
          {props.label}
        </KTextField.Label>
      </Show>

      <label
        data-slot="file-field-dropzone" class="relative flex flex-col items-center justify-center w-full min-h-35 border-2 border-dashed rounded-xl transition-all cursor-pointer bg-foreground/50 hover:bg-foreground/80 focus-within:ring-2 focus-within:ring-ring/20 focus-within:border-primary"
      >
        <KTextField.Input
          type="file"
          class="sr-only"
          accept={props.accept}
          multiple={props.multiple}
          onChange={onFileChange}
        />
        <CloudUpload data-slot="file-field-icon" class="w-10 h-10 mb-3 text-muted" />
        <div class="text-sm font-medium text-muted">
          {files().length > 0 ? `已选择 ${files().length} 个文件` : "点击或拖拽上传文件"}
        </div>
        <Show when={props.description}>
          <p data-slot="file-field-description" class="text-xs text-muted mt-1">
            {props.description}
          </p>
        </Show>
      </label>

      <KTextField.ErrorMessage
        data-slot="file-field-error-message" class="text-xs text-danger font-medium ml-1 mt-1"
      />
    </KTextField>
  );
};
