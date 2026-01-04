import { createSignal } from "solid-js";
import { SeForm, SeFormItem } from "../packages/solid-element-ui";
import { SeInput } from "../packages/solid-element-ui";
import { SeButton } from "../packages/solid-element-ui";

export default function FormDemo() {
    const [email, setEmail] = createSignal("");
    const [error, setError] = createSignal("");

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (!email().includes("@")) {
            setError("请输入有效的邮箱地址");
        } else {
            setError("");
            console.log("提交成功:", email());
        }
    };

    return (
        <div class="p-10 max-w-2xl">
            <SeForm
                layout="horizontal"
                labelCol={{ span: 4 }}
                onSubmit={handleSubmit}
            >
                <SeFormItem label="用户名" required help="请输入你的真实姓名">
                    <SeInput placeholder="例如: 张三" />
                </SeFormItem>

                <SeFormItem label="邮箱" required error={error()}>
                    <SeInput
                        value={email()}
                        onInput={(e) => setEmail(e.currentTarget.value)}
                        placeholder="example@mail.com"
                    />
                </SeFormItem>

                <SeFormItem>
                    <div class="flex gap-2">
                        <SeButton variant="primary" type="submit">
                            提交登记
                        </SeButton>
                        <SeButton variant="primary" type="reset">
                            重置
                        </SeButton>
                    </div>
                </SeFormItem>
            </SeForm>
        </div>
    );
}
