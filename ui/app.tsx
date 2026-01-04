import { createSignal } from "solid-js";
import { SeDatePicker } from "../packages/solid-element-ui/index";

export default ()=> {
    const [date, setDate] = createSignal("2026-01-04");

    return (
        <div class="p-8 space-y-6">
            <SeDatePicker size="sm" value={date()} />
        </div>
    );
}
