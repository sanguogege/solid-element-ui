import { Tooltip ,Button} from "solid-element-ui";
import { TrashIcon } from "lucide-solid";


const DemoCode = () => {
    return (
        <div class="flex items-center p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2 flex-wrap not-prose">
            <Tooltip content="删除此项" variant="danger" class="not-prose">
                <Button color="danger" variant="outline">
                   说出那话
                </Button>
            </Tooltip>

            <Tooltip content="测此项" variant="default" class="not-prose">
                <p class="bg-red-600">这是测试</p>
            </Tooltip>
        </div>
    );
};

export { DemoCode };
