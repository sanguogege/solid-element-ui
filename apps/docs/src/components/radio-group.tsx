import { RadioGroup } from "solid-element-ui";

const planOptions = [
    { label: "基础版 (免费)", value: "free" },
    { label: "专业版 ($19/mo)", value: "pro" },
    { label: "企业版 (联系我们)", value: "enterprise", disabled: true },
];

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-4">
            <RadioGroup
                label="选择您的订阅方案"
                options={planOptions}
                defaultValue="pro"
                orientation="horizontal"
            />
        </div>
    );
};

export { DemoCode };
