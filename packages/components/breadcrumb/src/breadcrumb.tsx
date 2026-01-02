import { splitProps, type ParentComponent } from "solid-js";

import { cn } from "@/utils/cn";
import { type BreadcrumbProps } from "./setting";

export const SeBreadcrumb: ParentComponent<BreadcrumbProps> = (props:BreadcrumbProps) => {

    const [local, others] = splitProps(props, ["children"]);




    return (
        <div {...others}>{local.children}</div>
    );
};
