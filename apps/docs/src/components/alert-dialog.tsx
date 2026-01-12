import { AlertDialog } from "solid-element-ui";


const AlertDialogDemo = () => {
    return (
        <div class="p-4">
            <AlertDialog
                trigger={
                    <button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        删除账户
                    </button>
                }
                title="确认操作"
                actionText="确认删除"
                cancelText="取消"
                onAction={() => console.log("执行删除")}
            >
                {/* 将文字包裹在 div 中以便控制间距 */}
                <div class="py-4 text-zinc-600 dark:text-zinc-400">
                    《Solid Element UI》是一个基于 SolidJS 和 Tailwind CSS
                    构建的现代化 UI 组件库...
                </div>
            </AlertDialog>
        </div>
    );
};

export { AlertDialogDemo };