import { Switch } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <Switch label="启用通知" defaultChecked />

            <Switch
                label="深色模式"
                description="自动根据系统设置调整外观。"
                variant="success"
                size="lg"
            />

            <Switch label="不可用选项" disabled />
        </div>
    );
};

export { DemoCode };
