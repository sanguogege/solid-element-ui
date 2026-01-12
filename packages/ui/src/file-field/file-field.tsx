import { FileField as KFileField } from "@kobalte/core/file-field";
import { splitProps, type ComponentProps } from "solid-js";
import { fileFieldVariants } from "./setting";
import { X, CloudUpload } from "lucide-solid";

const styles = fileFieldVariants();

// --- 扁平化组件定义 ---

export const FileFieldLabel = (
    props: ComponentProps<typeof KFileField.Label>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KFileField.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

export const FileFieldDropzone = (
    props: ComponentProps<typeof KFileField.Dropzone>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KFileField.Dropzone
            class={styles.dropzone({ class: local.class })}
            {...others}
        >
            <CloudUpload class="mb-2 h-8 w-8 text-zinc-400" />
            {local.children}
        </KFileField.Dropzone>
    );
};

export const FileFieldTrigger = (
    props: ComponentProps<typeof KFileField.Trigger>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KFileField.Trigger
            class={styles.trigger({ class: local.class })}
            {...others}
        />
    );
};

export const FileFieldItemList = (
    props: ComponentProps<typeof KFileField.ItemList>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KFileField.ItemList
            class={styles.itemList({ class: local.class })}
            {...others}
        />
    );
};

export const FileFieldItem = (
    props: ComponentProps<typeof KFileField.Item>
) => {
    const [local, others] = splitProps(props, ["class", "children"]); // 解析 children
    return (
        <KFileField.Item
            class={styles.item({ class: local.class })}
            {...others}
        >
            <KFileField.ItemPreview type="image" class={styles.itemPreview()}>
                <KFileField.ItemPreviewImage
                    class={styles.itemPreviewImage()}
                />
            </KFileField.ItemPreview>
            <div class="flex flex-1 flex-col overflow-hidden">
                <KFileField.ItemName class={styles.itemName()} />
                <KFileField.ItemSize class={styles.itemSize()} />
            </div>
            {local.children} {/* 允许用户在末尾插入自定义内容 */}
            <KFileField.ItemDeleteTrigger class={styles.itemDelete()}>
                <X class="h-4 w-4" />
            </KFileField.ItemDeleteTrigger>
        </KFileField.Item>
    );
};
// --- 聚合导出 (Namespace) ---

export const FileField = Object.assign(KFileField, {
    Label: FileFieldLabel,
    Dropzone: FileFieldDropzone,
    Trigger: FileFieldTrigger,
    ItemList: FileFieldItemList,
    Item: FileFieldItem,
    HiddenInput: KFileField.HiddenInput,
});
