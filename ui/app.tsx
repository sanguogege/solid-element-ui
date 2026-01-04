import {
    SePopconfirm,
    SeMessage,
    SeButton,
} from "../packages/solid-element-ui";

export default function PopconfirmDemo() {
    const confirmDelete = () => {
        SeMessage.success("删除成功！");
    };

    const cancelDelete = () => {
        SeMessage.info("已取消操作");
    };

    return (
        <div class="p-20 flex gap-10">
            {/* 基础用法 */}
            <SePopconfirm
                title="确定要删除这条记录吗？"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                placement="top"
            >
                <SeButton variant="danger">删除记录</SeButton>
            </SePopconfirm>

            {/* 带描述的复杂用法 */}
            <SePopconfirm
                title="重置系统配置"
                description="此操作将清空所有 2026 年度的自定义设置，且无法恢复。"
                okText="立即重置"
                cancelText="我再想想"
                onConfirm={() => SeMessage.warning("配置已重置")}
                placement="bottom"
            >
                <SeButton variant="success">系统重置</SeButton>
            </SePopconfirm>
        </div>
    );
}
