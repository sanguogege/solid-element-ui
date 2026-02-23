
import { Badge } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2">
            <Badge variant="default">Beta</Badge>
            <Badge variant="success">已上线</Badge>
            <Badge variant="danger">已下线</Badge>
            <Badge variant="outline">v1.0.0</Badge>
        </div>
    );
};

export { DemoCode };
