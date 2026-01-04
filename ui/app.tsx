import { createSignal, onMount } from "solid-js";
import {
    SeSkeleton,
    SeSkeletonElement,
    SeButton,
} from "../packages/solid-element-ui";

export default function SkeletonDemo() {
    const [loading, setLoading] = createSignal(true);

    return (
        <div class="p-10 max-w-2xl space-y-10">
            {/* 1. 组合型用法（最常用） */}
            <section class="space-y-4">
                <h3 class="text-sm font-bold text-gray-400">文章列表加载</h3>
                <SeSkeleton loading={loading()} avatar active>
                    <div class="flex gap-4">
                        <div class="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">
                            A
                        </div>
                        <div>
                            <h4 class="font-bold">2026 年度技术展望</h4>
                            <p class="text-sm text-gray-600">
                                这是已经加载完成的真实内容，展示了 Solid
                                的强大性能。
                            </p>
                        </div>
                    </div>
                </SeSkeleton>
            </section>

            {/* 2. 自由组合用法 */}
            <section class="space-y-4">
                <h3 class="text-sm font-bold text-gray-400">自定义布局</h3>
                <div class="flex items-center gap-2">
                    <SeSkeletonElement
                        shape="circle"
                        width={20}
                        height={20}
                        active
                    />
                    <SeSkeletonElement
                        shape="rect"
                        width={100}
                        height={20}
                        active
                    />
                    <SeSkeletonElement shape="button" active />
                </div>
                <SeSkeletonElement shape="input" active />
            </section>

            <SeButton onClick={() => setLoading(!loading())}>
                切换加载状态: {loading() ? "ON" : "OFF"}
            </SeButton>
        </div>
    );
}
