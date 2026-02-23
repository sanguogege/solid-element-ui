import { Breadcrumbs } from "solid-element-ui";

export const navItems = [
    { title: "首页", href: "/" },
    { title: "组件库", href: "/components" },
    { title: "面包屑", current: true },
];

const DemoCode = () => {
    return (
        <div class=" not-prose p-4 bg-white dark:bg-zinc-950 border rounded-lg">
            <Breadcrumbs class="" items={navItems} />
        </div>
    );
};

export { DemoCode };
