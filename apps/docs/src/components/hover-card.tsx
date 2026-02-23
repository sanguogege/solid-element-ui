import { HoverCard } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-y-2">
            <HoverCard
                size="lg"
                showArrow
                trigger={
                    <a href="#" class="text-blue-500 underline">
                        @Gemini
                    </a>
                }
            >
                <div class="flex flex-col gap-2">
                    <h4 class="font-bold">Gemini AI</h4>
                    <p class="text-sm text-slate-500">
                        一个能力出众、极具洞察力的 AI 思考伙伴。
                    </p>
                </div>
            </HoverCard>
        </div>
    );
};

export { DemoCode };
