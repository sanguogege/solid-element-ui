

export const accordionData = [
    { value: "1", title: "第一项", content: "内容部分" },
    { value: "2", title: "第二项", content: "内容部分" },
];


export const navItems = [
    { title: "首页", href: "/" },
    { title: "组件库", href: "/components" },
    { title: "面包屑", current: true },
];


export const menuItems = [
    { label: "返回", onClick: () => console.log("Back") },
    { label: "前进", disabled: true },
    { separator: true },
    {
        label: "更多工具",
        children: [
            { label: "保存页面", onClick: () => alert("Saved") },
            { label: "打印", onClick: () => window.print() },
        ],
    },
    { separator: true },
    { label: "检查", onClick: () => console.log("Inspect") },
];