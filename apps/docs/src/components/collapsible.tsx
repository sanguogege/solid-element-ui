import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "solid-element-ui";

const CollapsibleDemo = () => {
    return (
        <div class="p-4 w-[350px]">
            <Collapsible>
                <CollapsibleTrigger>
                    什么是 Solid Element UI？
                </CollapsibleTrigger>
                <CollapsibleContent>
                    它是一个基于 SolidJS 和 Tailwind CSS 构建的现代化 UI
                    组件库， 旨在提供高性能、无障碍（A11y）的开发体验。
                </CollapsibleContent>
            </Collapsible>

            <Collapsible>
                <CollapsibleTrigger>支持动画吗？</CollapsibleTrigger>
                <CollapsibleContent>
                    支持。你可以通过 Tailwind 的数据属性（data-expanded） 配合
                    CSS Transition 或 Keyframes 实现平滑的展开和收起动画。
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export { CollapsibleDemo };
