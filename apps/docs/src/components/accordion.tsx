import { Accordion } from "solid-element-ui";

export const data = [
    { value: "1", title: "第一项", content: "内容部分1" },
    { value: "2", title: "第二项", content: "内容部分2" },
];

const  DemoCode =  () => {
    return (
        <div class="not-prose p-4 bg-white dark:bg-zinc-950 border rounded-lg space-y-2">
            <Accordion class="w-48 not-prose" items={data} />
        </div>
    );
} 


export { DemoCode };