import { createSignal } from "solid-js";
import { SeInputTag } from "../packages/solid-element-ui";

export default function Demo() {
    const [tags, setTags] = createSignal(["Solid.js", "Tailwind"]);

    return (
        <div class="p-10 max-w-md">
            <label class="block text-sm font-medium mb-2">
                技能标签 (按回车添加):
            </label>
            <SeInputTag
                value={tags()}
                onChange={setTags}
                placeholder="输入后按回车..."
                size="md"
            />
            <div class="mt-4 text-xs text-gray-400">
                已选数据: {JSON.stringify(tags())}
            </div>
        </div>
    );
}
