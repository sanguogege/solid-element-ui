import { SePopover } from "../packages/solid-element-ui";

export default function Demo() {
    return (
        <div style="padding:300px;">
            <SePopover
                title={
                    <span>
                        <i class="icon" /> 提示
                    </span>
                }
                content="这是 2026 年标准的气泡卡片，支持 JSX 标题。"
                placement="top"
            >
                <button class="bg-blue-500 text-white px-4 py-2 rounded">
                    悬停查看
                </button>
            </SePopover>
        </div>
    );
}
