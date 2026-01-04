import { createSignal } from "solid-js";
import { SeTimePicker } from "../packages/solid-element-ui";

export default function TimePickerDemo() {
    const [time, setTime] = createSignal("12:30:00");

    return (
        <div class="p-20 max-w-[300px]">
            <label class="block text-sm mb-2 font-medium text-gray-700">
                选择预约时间:
            </label>
            <SeTimePicker
                value={time()}
                onChange={setTime}
                placeholder="请点击选择"
            />
            <div class="mt-4 p-2 bg-blue-50 text-[#1677ff] rounded border border-blue-100 text-xs">
                当前选中: {time()}
            </div>
        </div>
    );
}
