import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 为了兼容 ESM 模块环境
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取组件名称（从命令行参数获取，例如 `pnpm gen button` 后的 'button'）
// process.argv[2] 是实际输入的第一个参数
const componentName = process.argv[2];

if (!componentName) {
    console.error("❌ 请输入组件名称，例如: pnpm gen button");
    process.exit(1);
}

// 格式化名称：首字母大写
const formattedName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);
const exportName = `Se${formattedName}`;

// 定义路径
const targetDir = path.resolve(
    __dirname,
    `../packages/components/${componentName}`
);
const srcDir = path.join(targetDir, "src");
const testDir = path.join(targetDir, "__tests__");

// 检查文件夹是否已存在
if (fs.existsSync(targetDir)) {
    console.error(`❌ 组件 ${componentName} 已存在于 packages/components/ 中`);
    process.exit(1);
}

// 创建文件夹结构
fs.mkdirSync(srcDir, { recursive: true });
fs.mkdirSync(testDir, { recursive: true });

// --- 生成模板内容 ---

// 1. 组件 utama.tsx (例如 button.tsx)
const componentTemplate = `import { type ParentComponent } from "solid-js";
import { type ${formattedName}Props } from "./setting";

export const ${exportName}: ParentComponent<${formattedName}Props> = (props:${formattedName}Props) => {
    return (
        <div>${exportName}</div>
    );
};
`; 

// 2. setting.ts (存放类型定义)
const settingTemplate = `import { type JSX } from "solid-js";

// 定义组件的 Props 类型
export interface ${formattedName}Props {
    // 可以在这里添加你自定义的属性，例如：
    // variant?: "primary" | "secondary";
    // size?: "sm" | "md" | "lg";
}

// 导出其他的配置常量，例如默认样式映射等...
`;

// 3. 测试文件 (例如 button.test.tsx)
const testTemplate = `import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { ${exportName} } from "../src/${componentName}";

describe("${exportName}", () => {
    it("should render correctly", () => {
        render(() => <${exportName} />);
        expect(screen.getByText("${exportName}")).toBeInTheDocument();
    });
});
`;

// --- 写入文件 ---

// 写入主组件文件 (例如 input.tsx)
fs.writeFileSync(path.join(srcDir, `${componentName}.tsx`), componentTemplate);

// 写入 setting.ts
fs.writeFileSync(path.join(srcDir, `setting.ts`), settingTemplate);

// 写入测试文件
fs.writeFileSync(path.join(testDir, `${componentName}.test.tsx`), testTemplate);

console.log(`
✅ 组件 ${componentName} 创建成功！
📂 路径: packages/components/${componentName}
✨ 导出名: ${exportName}

已生成文件:
- src/${componentName}.tsx (主组件)
- src/setting.ts (类型定义)
- __tests__/${componentName}.test.tsx (测试文件)
`);
