import { useLocation, useNavigate } from "@solidjs/router";
import { createEffect, createMemo, Show } from "solid-js";

import Nav from "./components/nav";
import Aside from "./components/aside";
import Breadcrumbs from "./components/breadcrumbs";

import { MetaProvider, Title } from "@solidjs/meta";

export default (props: any) => {

    return (
        <MetaProvider>
            <Title>222</Title>
            <div class="flex flex-col h-screen overflow-hidden">
                <Nav></Nav>
                <div class="flex flex-grow overflow-hidden">
                    <Aside></Aside>
                    <div class="px-6 flex-1 w-full overflow-y-auto">
                        <Breadcrumbs />
                        {props.children}
                    </div>
                </div>
            </div>
        </MetaProvider>
    );
};
