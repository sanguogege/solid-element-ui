import { createSignal } from "solid-js";
import { SeAutocomplete, SeCheckbox, SeDivider } from "../packages/solid-element-ui";

const [options] = createSignal([
    { value: "Apple" },
    { value: "Banana" },
    { value: "Blueberry" },
    { value: "Cherry" },
]);

const [value, setValue] = createSignal("");

export default () => {
    const [checked, setChecked] = createSignal(false);
    return (
        <>
            <SeCheckbox label="记住我" />
            <SeCheckbox
                checked={checked()}
                onChange={(e) => setChecked(e.currentTarget.checked)}
                label="接受协议"
            />
            <SeCheckbox error label="必须同意条款" class="mt-4" />
        </>
    );
};
