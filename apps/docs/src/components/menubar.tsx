import { Menubar } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <Menubar>
                <Menubar.Menu>
                    <Menubar.Trigger>文件</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>
                            新建项目 <Menubar.Shortcut>⌘N</Menubar.Shortcut>
                        </Menubar.Item>
                        <Menubar.Separator />
                        <Menubar.Item disabled>删除</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>

                <Menubar.Menu>
                    <Menubar.Trigger>帮助</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>检查更新</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
            </Menubar>
        </div>
    );
};

export { DemoCode };
