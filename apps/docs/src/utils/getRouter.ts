const formattedRoutes = (rawRoutes: any) => {
    return rawRoutes
        .filter((route: any) => {
            // 1. 排除通配符和 404 (包含 * 或 [... )
            const isSpecial =
                route.path.includes("*") || route.path.includes("[...");

            // 2. 处理路径并判断是否为空
            // 先模拟去除首尾斜杠的操作来判断
            const checkPath = route.path.replace(/^\/|\/$/g, "");
            const isEmpty = checkPath === "" || route.path === "/";

            // 同时满足：非特殊路径 且 非空路径
            return !isSpecial && !isEmpty;
        })
        .map((route: any) => {
            // 此时过滤掉后的 path 均不为空且不含特殊符号
            const cleanPath = route.path.replace(/^\/|\/$/g, "");

            return {
                path: cleanPath,
                name: cleanPath, // 因为排除了首页，这里 cleanPath 一定有值
            };
        });
};

export { formattedRoutes };
