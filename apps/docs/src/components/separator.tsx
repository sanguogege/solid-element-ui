import { Separator } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-4">
            <h4 class="font-medium text-sm">通知设置</h4>
            <p class="text-xs text-slate-500">管理您的应用推送偏好。</p>

            <Separator class="my-2" />

            <p class="text-xs text-slate-500">管理您的应用推送偏好。</p>
            <p class="text-xs text-slate-500">管理您的应用推送偏好。</p>

            <div class="flex h-5 items-center space-x-4 text-sm">
                <div>个人资料</div>
                <Separator orientation="vertical" />
                <div>账户</div>
                <Separator orientation="vertical" />
                <div>安全</div>
            </div>
        </div>
    );
};

export { DemoCode };
