import { splitProps, type ParentComponent } from "solid-js";
import { type TimelineProps } from "./setting";

export const SeTimeline: ParentComponent<TimelineProps> = (props) => {
    const [local, others] = splitProps(props, ["class", "children"]);

    return (
        <div {...others} class={`flex flex-col py-2 ${local.class || ""}`}>
            {local.children}
        </div>
    );
};
