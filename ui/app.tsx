import { SeMessage, SeButton } from "../packages/solid-element-ui";

export default function MessageDemo() {
    const showSuccess = () => {
        SeMessage.success("恭喜，操作已成功完成！");
    };

    const showLoading = () => {
        const id = SeMessage.loading("正在处理数据...");
        // 模拟异步操作
        setTimeout(() => {
            // 在 2026 年，你甚至可以手动清除或替换特定 ID 的消息
            SeMessage.success("处理完成！");
        }, 2000);
    };

    return (
        <div class="p-10 space-x-4">
            <SeButton variant="primary" onClick={showSuccess}>
                成功提示
            </SeButton>

            <SeButton
                variant="success"
                onClick={() => SeMessage.error("系统发生未知错误")}
            >
                错误提示
            </SeButton>

            <SeButton onClick={showLoading}>异步加载</SeButton>
        </div>
    );
}
