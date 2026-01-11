import { Suspense } from "solid-js";

import Nav from "./components/nav";
import Aside from "./components/aside";

export default (props: any) => {
    return (
        <div class="min-h-dvh flex flex-col">
            <Nav />
            <main class="flex flex-1 overflow-hidden">
                <Aside />
                <div class="p-4 flex-1 overflow-y-auto">
                    <Suspense>{props.children}</Suspense>
                </div>
            </main>
        </div>
    );
};
