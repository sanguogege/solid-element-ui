import { Pagination } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="not-prose p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-2">
            <Pagination count={10} defaultPage={1} />
        </div>
    );
};

export { DemoCode };
