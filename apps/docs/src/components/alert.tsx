import { Alert } from "solid-element-ui";

const DemoCode = () => {
    return <div class="p-4 bg-white not-prose dark:bg-zinc-950 border rounded-lg space-y-2">
        <Alert variant="success" title="成功" class="text-red-900" icon>
            组件现已正确导出，去掉了不存在的 .Root 属性。
        </Alert>

        <Alert variant="info" title="提示" icon>
            基于 Tailwind v4 和 Kobalte 构建。
        </Alert>

        <Alert variant="warning" title="警告" icon>
            警告
        </Alert>

        <Alert variant="danger" title="错误" icon>
            类型检查现已通过。
        </Alert>

    </div>;
};

export { DemoCode };
