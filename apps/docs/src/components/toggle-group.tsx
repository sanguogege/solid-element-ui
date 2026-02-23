import { ToggleGroup } from "solid-element-ui";
import { TextAlignStart, TextAlignCenter, TextAlignEnd } from "lucide-solid";
const DemoCode = () => {
    return (
        <div class="flex gap-2 p-4">
            <ToggleGroup
                type="single"
                defaultValue="left"
                options={[
                    { label: <TextAlignStart size={18} />, value: "left" },
                    { label: <TextAlignCenter size={18} />, value: "center" },
                    { label: <TextAlignEnd size={18} />, value: "right" },
                ]}
            />

            <ToggleGroup
                type="multiple"
                options={[
                    { label: "加粗", value: "bold" },
                    { label: "倾斜", value: "italic" },
                    { label: "下划线", value: "underline" },
                ]}
            />
        </div>
    );
};

export { DemoCode };
