import { FileRoutes } from "@solidjs/start/router";
import { getFilteredRoutes } from "~/utils/getRouter";

export default () => {
    const filteredRoutes = getFilteredRoutes(FileRoutes());
    return (
        <aside class="bg-orange-300 h-screen sticky top-0 flex flex-col">
            {/* 添加 overflow-y-auto 使其支持纵向滚动 */}
            {/* 添加 custom-scrollbar (可选) 优化视觉体验 */}
            <ul class="container flex flex-col p-3 text-red-800 w-32 overflow-y-auto scrollbar-thin">
                {filteredRoutes.map((route: any) => (
                    <li class="my-1.5 shrink-0">
                        <a href={route.path} class="hover:underline">
                            {route.path.replace("/", "") || "Home"}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
};
