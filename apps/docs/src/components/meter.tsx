import { Meter } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <Meter value={75} color="success">
                <div class="flex justify-between">
                    <Meter.Label>存储空间</Meter.Label>
                    <Meter.ValueLabel />
                </div>
                <Meter.Track>
                    <Meter.Fill />
                </Meter.Track>
            </Meter>
        </div>
    );
};

export { DemoCode };
