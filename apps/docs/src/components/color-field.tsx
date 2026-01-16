import { ColorField } from "solid-element-ui";

export const demo =()=>{
    return (
        <div class="flex flex-col gap-6 p-4 border rounded-xl bg-white dark:bg-zinc-950 max-w-sm">
            {/* 基础用法 */}
            <ColorField label="背景颜色" defaultValue="#3b82f6" />

            {/* 带描述信息 */}
            <ColorField
                label="主题色"
                desc="请输入十六进制或 HSL 格式"
                defaultValue="hsl(217, 91%, 60%)"
            />

            {/* 错误状态 */}
            <ColorField
                label="边框颜色"
                error="无效的颜色代码"
                defaultValue="not-a-color"
            />
        </div>
    );
}