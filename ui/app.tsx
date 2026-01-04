import { createSignal } from "solid-js";
import { SeSlider } from "../packages/solid-element-ui";

export default function SliderDemo() {
    const [val, setVal] = createSignal(30);

    return (
        <div class="p-12 max-w-md">
            <h3 class="mb-8 text-sm font-medium">音量调节: {val()}%</h3>

            {/* 基础滑动 */}
            <SeSlider value={val()} onChange={setVal} min={0} max={100} />

            {/* 步进滑动 */}
            <div class="mt-8">
                <p class="text-xs text-gray-400 mb-2">步进 (Step: 20):</p>
                <SeSlider value={val()} onChange={setVal} step={20} />
            </div>

            {/* 禁用状态 */}
            <div class="mt-8">
                <p class="text-xs text-gray-400 mb-2">禁用状态:</p>
                <SeSlider value={60} disabled />
            </div>
        </div>
    );
}
