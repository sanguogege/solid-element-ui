import { Button, showToast } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <Button
                variant="default"
                onClick={() =>
                    showToast({
                        variant: "success",
                        title: "操作成功",
                        description: "数据已同步至云端",
                    })
                }
            >
                确定
            </Button>
        </div>
    );
};

export { DemoCode };
