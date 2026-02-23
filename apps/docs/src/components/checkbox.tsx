import { Checkbox } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="flex p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2">
            <Checkbox label="接受服务协议" />

            <Checkbox defaultChecked label="默认选中项" />

            <Checkbox disabled label="禁用状态" />

            <Checkbox
                label="接受条款"
                validationState="invalid"
                description="请阅读我们的隐私政策。"
                errorMessage="您必须同意后才能继续"
                size="lg"
                color="primary"
            />
        </div>
    );
};

export { DemoCode };
