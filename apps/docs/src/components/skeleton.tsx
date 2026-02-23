import { Skeleton } from "solid-element-ui";

const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 space-y-4">
            <Skeleton width="100%" height={200} variant="rect" />
            <Skeleton width={40} height={40} variant="circle" />
        </div>
    );
};

export { DemoCode };
