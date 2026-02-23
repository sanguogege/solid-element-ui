import { ContextMenu } from "solid-element-ui";


export const menuItems = [
    { label: "返回", onClick: () => console.log("Back") },
    { label: "前进", disabled: true },
    { separator: true },
    {
        label: "更多工具",
        children: [
            { label: "保存页面", onClick: () => alert("Saved") },
            { label: "打印", onClick: () => window.print() },
        ],
    },
    { separator: true },
    { label: "检查", onClick: () => console.log("Inspect") },
];

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-y-2">
            <ContextMenu
                items={menuItems}
                class="flex h-32 w-full items-center justify-center border-2 border-dashed rounded-lg"
            >
                <span>触发区域</span>
            </ContextMenu>
        </div>
    );
};

export { DemoCode };
