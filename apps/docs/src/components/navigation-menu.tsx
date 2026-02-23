import { NavigationMenu } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="not-prose p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <NavigationMenu
                items={[
                    { title: "文档", href: "/docs" },
                    {
                        title: "资源",
                        content: (
                            <div class="w-75 p-4 text-sm">
                                内置丰富组件示例...
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export { DemoCode };
