import { Popover } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <Popover
                title="111"
                trigger={
                    <span class="text-blue-500 cursor-help">查看帮助</span>
                }
            >
                <p class="text-sm">这是气泡卡片的内容区域。</p>
            </Popover>
        </div>
    );
};

export { DemoCode };
