import { Search } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-4">
            {/* 基础搜索 */}
            <Search placeholder="搜索文档..." />

            {/* 带清除按钮和变体 */}
            <Search
                variant="lg"
                ringColor="danger"
                allowClear
                placeholder="快速跳转..."
            />
        </div>
    );
};

export { DemoCode };
