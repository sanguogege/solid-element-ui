import { Progress } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-4">
            {/* 基础用法 */}
            <Progress value={60} label="正在下载..." showValue />

            {/* 不确定状态 (加载中) */}
            <Progress indeterminate label="系统更新中" />

            {/* 尺寸定制 */}
            <Progress value={30} size="sm" radius="none" />
        </div>
    );
   
};

export { DemoCode };
