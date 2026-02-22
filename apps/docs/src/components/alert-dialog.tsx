import { AlertDialog, Button } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="p-4 bg-white not-prose dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <AlertDialog
                title="确认删除？"
                description="此操作不可逆。"
                trigger={<Button>点击弹出</Button>}
            />

            <AlertDialog
                title="确认删除？"
                description="此操作不可逆。"
                trigger={<Button color="warning">自定义action</Button>}
                action={
                    <Button onclick={() => alert("确认删除？")} color="danger">
                        确定
                    </Button>
                }
            />

            <AlertDialog
                title="删除提醒"
                onConfirm={() => alert("执行删除操作")}
                trigger={<Button color="danger">点击删除</Button>}
            />
        </div>
    );
};

export { DemoCode };
