import { Button } from "solid-element-ui";
import { Settings } from "lucide-solid";

const ButtonDemo = () => {
    return (
        <>
            <div class="flex flex-wrap gap-4">
                <Button variant="default">default</Button>
                <Button variant="destructive">destructive</Button>
                <Button variant="outline">outline</Button>
                <Button loading={true}>loading</Button>
                <Button size="icon" variant="ghost">
                    <Settings />
                </Button>
                <Button variant="link">link button</Button>
            </div>
        </>
    );
};

export { ButtonDemo };
