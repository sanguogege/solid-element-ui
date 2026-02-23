import { Select } from "solid-element-ui";

export const selectOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry", disabled: true },
];
const DemoCode = () => {
    return (
        <div class="not-prose p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <Select
                label="水果"
                options={selectOptions}
                placeholder="请选择一个水果..."
                description="请确保选择您不过敏的水果。"
            />
        </div>
    );
};

export { DemoCode };
