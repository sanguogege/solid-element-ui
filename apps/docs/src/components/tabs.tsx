import { Tabs } from "solid-element-ui";
const tabOptions = [
    { value: "account", label: "账户", content: "这里是账户设置内容。" },
    { value: "password", label: "密码", content: "在此处修改您的登录密码。" },
    {
        value: "settings",
        label: "偏好",
        content: "管理您的系统通知和外观设置。",
    },
];

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <Tabs items={tabOptions} defaultValue="account" />
        </div>
    );
};

export { DemoCode };
