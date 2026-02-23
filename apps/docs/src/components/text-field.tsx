import { TextField } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            {/* 基础用法 */}
            <TextField label="用户名" placeholder="请输入用户名" />

            {/* 密码类型 + 描述 */}
            <TextField
                type="password"
                label="密码"
                description="密码长度至少为 8 位。"
            />

            {/* 错误状态 */}
            <TextField
                label="邮箱"
                defaultValue="invalid-email"
                errorMessage="请输入有效的邮箱地址。"
            />
        </div>
    );
};

export { DemoCode };
