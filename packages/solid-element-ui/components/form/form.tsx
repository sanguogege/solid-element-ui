import {
    createContext,
    useContext,
    splitProps,
    type ParentComponent,
} from "solid-js";
import { cn } from "@solid-element-ui/utils/cn";
import { type FormProps, type FormContextValue } from "./setting";

const FormContext = createContext<FormContextValue>();

export const SeForm: ParentComponent<FormProps> = (props) => {
    const [local, others] = splitProps(props, [
        "class",
        "children",
        "layout",
        "labelCol",
        "wrapperCol",
        "labelAlign",
    ]);

    // 提供默认值
    const contextValue: FormContextValue = {
        layout: () => local.layout || "vertical",
        labelCol: () => local.labelCol || { span: 5 },
        wrapperCol: () => local.wrapperCol || { span: 19 },
        labelAlign: () => local.labelAlign || "right",
    };

    return (
        <FormContext.Provider value={contextValue}>
            <form
                {...others}
                class={cn(
                    "space-y-4",
                    local.layout === "inline" &&
                        "flex flex-wrap gap-4 space-y-0 items-start",
                    local.class
                )}
            >
                {local.children}
            </form>
        </FormContext.Provider>
    );
};

export const useFormContext = () => useContext(FormContext);
