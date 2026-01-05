import { splitProps, type ParentComponent } from "solid-js";

import { cn } from "solid-element-ui/utils/cn";
import { type CascaderProps } from "./setting";

export const SeCascader: ParentComponent<CascaderProps> = (props:CascaderProps) => {

    const [local, others] = splitProps(props, ["children"]);




    return (
        <div {...others}>{local.children}</div>
    );
};
