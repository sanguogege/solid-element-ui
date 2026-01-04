import { createSignal } from "solid-js";
import { SeMentions } from "../packages/solid-element-ui";

export default function Demo() {
    const [value, setValue] = createSignal("");
    const users = [
        { label: "Admin", value: "admin" },
        { label: "User1", value: "user1" },
        { label: "SolidJS", value: "solidjs" },
        { label: "Tailwind", value: "tailwind" },
    ];

    return (
        <div class="p-20 max-w-lg mx-auto">
            <label class="block mb-2 text-sm font-medium">
                输入 @ 提及用户:
            </label>
            <SeMentions
                options={users}
                value={value()}
                onChange={setValue}
                placeholder="说点什么吧..."
                rows={4}
            />
            <div class="mt-4 p-2 bg-gray-50 text-xs rounded border">
                实时输出: {value()}
            </div>
        </div>
    );
}
