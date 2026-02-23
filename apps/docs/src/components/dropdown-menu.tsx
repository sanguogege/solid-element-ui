import { DropdownMenu } from "solid-element-ui";

export const profileMenu = [
    { label: "个人资料", onClick: () => console.log("Profile") },
    { label: "设置", onClick: () => console.log("Settings") },
    { separator: true },
    {
        label: "邀请好友",
        children: [
            { label: "通过邮件", onClick: () => {} },
            { label: "通过微信", onClick: () => {} },
        ],
    },
    { separator: true },
    { label: "退出登录", onClick: () => {}, disabled: false },
];

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-y-2">
            <DropdownMenu
                items={profileMenu}
                trigger={<button class="btn">账户设置</button>}
            />
        </div>
    );
};

export { DemoCode };
