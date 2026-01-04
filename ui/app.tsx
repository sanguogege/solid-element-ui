import { createSignal } from "solid-js";
import { SeColorPicker } from "../packages/solid-element-ui/index";

export default ()=> {
    const [color, setColor] = createSignal("#3b82f6");

    return (
        <div class="p-10 space-y-4">
            {/* 基础用法 */}
            <SeColorPicker
                value={color()}
                onInput={(e) => setColor(e.currentTarget.value)}
                label="主题色"
                showValue
            />

            {/* 不同尺寸 */}
            <SeColorPicker size="sm" value="#ef4444" />
            <SeColorPicker size="lg" value="#10b981" />
        </div>
    );
}
