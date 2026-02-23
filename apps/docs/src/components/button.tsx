import { Button } from "solid-element-ui";
import { Search } from "lucide-solid";

const DemoCode = () => {
    return (
        <>
            <div class="not-prose flex p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 my-2">
                <Button variant="default">default</Button>
                <Button variant="outline">outline</Button>
                <Button variant="dashed">dashed</Button>
                <Button variant="filled">filled</Button>
                <Button variant="text">text</Button>
            </div>
            <div class="not-prose flex p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 my-2">
                <Button color="primary">primary</Button>
                <Button variant="outline" color="primary">
                    primary
                </Button>
                <Button variant="dashed" color="primary">
                    primary
                </Button>
                <Button variant="filled" color="primary">
                    primary
                </Button>
                <Button variant="text" color="primary">
                    primary
                </Button>
            </div>
            <div class="not-prose flex p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 my-2">
                <Button color="success">success</Button>
                <Button variant="outline" color="success">
                    primary
                </Button>
                <Button variant="dashed" color="success">
                    primary
                </Button>
                <Button variant="filled" color="success">
                    primary
                </Button>
                <Button variant="text" color="success">
                    primary
                </Button>
            </div>
            <div class="not-prose flex p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 my-2">
                <Button color="warning">warning</Button>
                <Button variant="outline" color="warning">
                    primary
                </Button>
                <Button variant="dashed" color="warning">
                    primary
                </Button>
                <Button variant="filled" color="warning">
                    primary
                </Button>
                <Button variant="text" color="warning">
                    primary
                </Button>
            </div>
            <div class="not-prose flex p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 my-2">
                <Button color="danger">danger</Button>
                <Button variant="outline" color="danger">
                    primary
                </Button>
                <Button variant="dashed" color="danger">
                    primary
                </Button>
                <Button variant="filled" color="danger">
                    primary
                </Button>
                <Button variant="text" color="danger">
                    primary
                </Button>
            </div>

            <div class="not-prose flex p-4 bg-white dark:bg-zinc-950 border rounded-lg space-x-2 my-2">
                <Button color="danger" leftIcon={<div>左边</div>}>
                    danger
                </Button>

                <Button
                    variant="text"
                    color="danger"
                    rightIcon={<div>右边</div>}
                >
                    primary
                </Button>
            </div>
        </>
    );
};

export { DemoCode };
