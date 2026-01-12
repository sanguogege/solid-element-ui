import { Checkbox } from "solid-element-ui";
import { createSignal } from "solid-js";

const CheckboxDemo = () => {
    const [checked, setChecked] = createSignal(false);

    return (
        <div class="p-4 space-y-6">
            <Checkbox label="接受服务条款" />

            <div class="space-y-2">
                <Checkbox
                    label="自动续费"
                />
                <p class="text-xs text-zinc-500">
                    当前状态: {checked() ? "开启" : "关闭"}
                </p>
            </div>

            <Checkbox label="不可选选项 (禁用)" disabled />
          
        </div>
    );
};

export { CheckboxDemo };
