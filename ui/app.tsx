import { SeMasonry } from "../packages/solid-element-ui";

export default function MasonryDemo() {
    // 模拟具有不同高度的数据
    const data = [
        {
            id: 1,
            title: "探索 2026 科技趋势",
            height: "h-48",
            color: "bg-blue-100",
        },
        {
            id: 2,
            title: "Solid.js 性能优化指南",
            height: "h-64",
            color: "bg-green-100",
        },
        {
            id: 3,
            title: "Tailwind v4.0 抢先看",
            height: "h-32",
            color: "bg-purple-100",
        },
        {
            id: 4,
            title: "响应式设计新方案",
            height: "h-56",
            color: "bg-amber-100",
        },
        {
            id: 5,
            title: "Web 标准化进程",
            height: "h-40",
            color: "bg-rose-100",
        },
        {
            id: 6,
            title: "瀑布流布局的最佳实践",
            height: "h-72",
            color: "bg-indigo-100",
        },
    ];

    return (
        <div class="p-8 bg-gray-50 min-h-screen">
            <h2 class="text-2xl font-bold mb-8 text-gray-800 text-center">
                瀑布流展示
            </h2>

            <SeMasonry
                items={data}
                columns={3}
                gap={6}
                renderItem={(item) => (
                    <div
                        class={`${item.color} rounded-2xl p-6 border border-white shadow-sm flex flex-col justify-end ${item.height}`}
                    >
                        <h3 class="font-bold text-gray-900">{item.title}</h3>
                        <p class="text-xs text-gray-500 mt-2">ID: {item.id}</p>
                    </div>
                )}
            />
        </div>
    );
}
