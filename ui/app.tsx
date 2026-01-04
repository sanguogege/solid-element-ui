import { createSignal } from "solid-js";
import { SeCalendar } from "../packages/solid-element-ui";

export default function Demo() {
    const [selected, setSelected] = createSignal(new Date());

    return (
        <SeCalendar
            value={selected()}
            onChange={(date) => setSelected(date)}
            dateCellRender={(date) =>
                date.getDate() === 20 ? (
                    <div class="text-[10px] text-blue-500">有会议</div>
                ) : null
            }
        />
    );
}
