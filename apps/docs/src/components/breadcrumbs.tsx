import {
    Breadcrumbs,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "solid-element-ui";

const BreadcrumbsDemo = () => {
    return (
        <div class="p-4">
            <Breadcrumbs>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">首页</BreadcrumbLink>
                </BreadcrumbItem>

                {/* 自动渲染 ChevronRight 图标 */}
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink href="/docs">文档</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    {/* 当前页面 */}
                    <BreadcrumbLink current>面包屑组件</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumbs>
        </div>
    );
};

export { BreadcrumbsDemo };
