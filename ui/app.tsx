import { SeInputNumber } from "@/solid-element-ui";
import { createSignal } from "solid-js";


export default function FormDemo() {
    const [val, setVal] = createSignal(10);

  return (
    <div class="p-10 space-y-4 max-w-xs">
      <label class="text-sm">购买数量 (步进 0.5, 精度 1):</label>
      <SeInputNumber 
        value={val()} 
        onChange={setVal} 
        min={0} 
        max={100} 
        step={0.5} 
        precision={1}
      />
      <div class="text-xs text-gray-500">当前数值: {val()}</div>
    </div>)
}
