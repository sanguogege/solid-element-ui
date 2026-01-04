import { createSignal } from "solid-js";
import { SeAutocomplete, SeDivider } from "../packages/solid-element-ui";

const [options] = createSignal([
    { value: "Apple" },
    { value: "Banana" },
    { value: "Blueberry" },
    { value: "Cherry" },
]);

const [value, setValue] = createSignal("");

export default () => {
    return (
        <>
            <div>{value()}</div>
            <SeAutocomplete
                options={options()}
                onInputChange={(val) => setValue(val)}
                placeholder="请输入水果名称..."
                onSelect={(opt) => console.log("选中了:", opt)}
                class="se-max-w-xs"
            />
        </>
    );
};
