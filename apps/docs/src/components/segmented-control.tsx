import { SegmentedControl } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="not-prose p-4 bg-white dark:bg-zinc-950 border rounded-lg space-y-2">
            <SegmentedControl
                label="环境选择"
                options={[
                    { label: "开发", value: "dev" },
                    { label: "测试", value: "test" },
                    { label: "生产", value: "prod" },
                ]}
            />
        </div>
    );
};

export { DemoCode };
