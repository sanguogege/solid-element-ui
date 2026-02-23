import { Collapsible } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="not-prose flex p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2">
            <Collapsible title="查看源代码说明" class="not-prose">
                这段内容默认是隐藏的，点击上方按钮可以展开。
                它使用了原生高度动画和 Kobalte 的状态管理。
            </Collapsible>
        </div>
    );
};

export { DemoCode };
