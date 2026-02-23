import { Tooltip } from "solid-element-ui";
import { TrashIcon } from "lucide-solid";


const DemoCode = () => {
    return (
        <div class="flex gap-2 p-4">
            <Tooltip content="删除此项" variant="danger" class="not-prose">
                <button class="p-2 text-red-500 hover:bg-red-50 rounded">
                    <TrashIcon />
                </button>
            </Tooltip>

            <Tooltip content="测此项" variant="default" class="not-prose">
                <p>这是测试</p>
            </Tooltip>
        </div>
    );
};

export { DemoCode };
