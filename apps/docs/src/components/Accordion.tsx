
import { Accordion } from "solid-element-ui";


const data = [
    { value: "1", title: "第一项", content: "这里是内容..." },
    { value: "2", title: "第二项", content: "这里支持 JSX <b>内容</b>" },
];


export const AccordionDemo = () => {
    return (
        <div>
            <Accordion  />
            <br />
            <Accordion
            />
        </div>
    );
}
