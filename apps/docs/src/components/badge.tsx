import { Badge } from "solid-element-ui";

const BadgeDemo = () => {
    return (
        <div class="p-4 flex flex-wrap gap-2">
            <Badge variant="default">已发布</Badge>

            <Badge variant="secondary">待审核</Badge>

            <Badge variant="destructive">已拒绝</Badge>

            <Badge variant="outline">草稿</Badge>

            {/* 测试自定义 class 是否生效 */}
            <Badge class="mt-2 w-full justify-center">全宽 Badge</Badge>
        </div>
    );
};

export { BadgeDemo };
