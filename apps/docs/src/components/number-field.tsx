import { NumberField } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <NumberField
                label="购买数量"
                defaultValue={1}
                minValue={1}
                maxValue={10}
                step={1}
            />
        </div>
    );
};

export { DemoCode };
