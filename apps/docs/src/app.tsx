import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

import Nav from "./layout/components/nav";
import Aside from "./layout/components/aside";

export default function App() {
    return (
        <Router
            root={(props) => {
                console.log(props);
                const location = useLocation();
                const isHome = () => location.pathname === "/";

                return (
                    // <Show
                    //     when={!isHome()}
                    //     fallback={<Suspense>{props.children}</Suspense>} // 首页直接渲染内容，不带 Layout
                    // >
                    //     <Layout>
                    //         <Suspense>{props.children}</Suspense>
                    //     </Layout>
                    // </Show>
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
            }}
        >
            <FileRoutes />
        </Router>
    );
}
