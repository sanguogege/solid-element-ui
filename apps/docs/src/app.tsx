import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, Show } from "solid-js";
import Layout from "./layout";

export default function App() {
    return (
        <Router
            root={(props) => {
                const location = useLocation();
                const isHome = () => location.pathname === "/";

                return (
                    <Show
                        when={!isHome()}
                        fallback={<Suspense>{props.children}</Suspense>} // 首页直接渲染内容，不带 Layout
                    >
                        <Layout>
                            <Suspense>{props.children}</Suspense>
                        </Layout>
                    </Show>
                );
            }}
        >
            <FileRoutes />
        </Router>
    );
}
