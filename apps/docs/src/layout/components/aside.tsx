import { FileRoutes } from "@solidjs/start/router";
import { For } from "solid-js";
import { formattedRoutes } from "@/utils/getRouter";

export default () => {

    // 你可以获取由文件系统生成的路由配置数组
    const rawRoutes = FileRoutes();
    const newRoutes = formattedRoutes(rawRoutes);
    return (
        <nav>
            <ul class="bg-gray-800 h-full w-48 text-white p-4 space-y-4">
                <For each={newRoutes}>
                    {(route) => (
                        <li>
                            <a href={route.path}>{route.name}</a>
                        </li>
                    )}
                </For>
            </ul>
        </nav>
    );
};
