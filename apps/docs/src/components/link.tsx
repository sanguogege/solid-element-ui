import { Link } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            {/* 默认链接 */}
            <Link
                href="[https://github.com](https://github.com)"
                class="not-prose"
                external
            >
                GitHub 官网
            </Link>

            {/* 品牌颜色变体 */}
            <Link href="/docs" variant="primary" class="not-prose">
                查看文档
            </Link>

            {/* 模拟按钮样式 */}
            <Link href="/login" variant="button" class="not-prose" radius="sm">
                立即登录
            </Link>
        </div>
    );
};

export { DemoCode };
