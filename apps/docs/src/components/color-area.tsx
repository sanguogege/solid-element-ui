import { ColorArea } from "solid-element-ui";
import { createSignal } from "solid-js";

const ColorAreaDemo = () => {
    const [color, setColor] = createSignal(() => ("hsb(0, 100%, 100%)"));

    return (
        <div class="p-4 w-64">
            <ColorArea
                label="饱和度与明度"
                // value={color()}
                onChange={setColor}
            />
        </div>
    );
};

export { ColorAreaDemo };
