import { ToggleButton } from "solid-element-ui";
import { Bold, Italic } from "lucide-solid";
const DemoCode = () => {
    return (
        <div class="flex p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <ToggleButton size="icon" variant="outline" aria-label="加粗">
                {(state:any) => (
                    <Bold
                        class={state.pressed() ? "text-blue-500" : ""}
                        size={20}
                    />
                )}
            </ToggleButton>

            <ToggleButton variant="solid" pressed={true}>
                {(state:any) => (state.pressed() ? "已收藏" : "收藏")}
            </ToggleButton>
        </div>
    );
};

export { DemoCode };