const getFilteredRoutes: any = (routes: any[]) => {
    return (
        routes
            .filter((route) => {
                // 1. 排除 404 页面
                if (
                    route.path.includes("404") ||
                    route.path.includes("*") ||
                    route.path.includes("color-area") ||
                    route.path.includes("color-channel-field") ||
                    route.path.includes("color-field") ||
                    route.path.includes("color-slider") ||
                    route.path.includes("color-wheel") ||
                    route.path.includes("color-swatch")
                ) {
                    return false;
                }
                // 2. 排除 index 页面
                if (route.path === "/" || route.path === "") {
                    return false;
                }
                return true;
            })
            .map((route) => {
                // 如果有子路由，递归过滤并排序子路由
                if (route.children) {
                    return {
                        ...route,
                        children: getFilteredRoutes(route.children),
                    };
                }
                return route;
            })
            // 3. 核心：按 path 字母顺序排序
            .sort((a, b) => a.path.localeCompare(b.path))
    );
};

export { getFilteredRoutes };
