import { Slider } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-4">
            <Slider
                label="价格区间"
                defaultValue={[20, 80]}
                variant="success"
                showValue
            />
        </div>
    );
};

export { DemoCode };
