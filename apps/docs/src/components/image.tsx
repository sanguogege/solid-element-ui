import { Image } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-y-2">
            {/* 正常显示 */}
            <Image
                class="w-20 h-20"
                src="https://avatars.githubusercontent.com/u/25738532"
                radius="full"
            />

            {/* 加载失败显示 Fallback (默认取 alt 前两个字母) */}
            <Image
                class="w-20 h-20"
                src="invalid.jpg"
                alt="Gemini"
                radius="md"
            />

            {/* 自定义 Fallback 内容 */}
            <Image
                class="w-20 h-20"
                src="invalid.jpg"
                fallback={<div class="text-xs">Error</div>}
            />
        </div>
    );
};

export { DemoCode };
