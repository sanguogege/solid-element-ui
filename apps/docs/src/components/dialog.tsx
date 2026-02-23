import { Dialog } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-y-2">
            <Dialog
                title="确认操作"
                description="此操作无法撤销，请确认是否继续。"
                trigger={<button class="btn-primary">删除账户</button>}
            >
                <p class="text-sm text-zinc-600">
                    删除后，您的所有数据将永久从我们的服务器中移除。
                </p>
            </Dialog>
        </div>
    );
};

export { DemoCode };
