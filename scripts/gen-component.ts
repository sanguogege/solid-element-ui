import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 为了兼容 ESM 模块环境
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取组件名称（例如 `pnpm gen cool-button`）
const componentName = process.argv[2];

if (!componentName) {
    console.error("❌ 请输入组件名称，例如: pnpm gen cool-button");
    process.exit(1);
}

/**
 * 将 kebab-case (aa-bb) 转换为 PascalCase (AaBb)
 */
const toPascalCase = (str: string) => {
    return str
        .split("-")
        .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join("");
};

// 格式化名称
const formattedName = toPascalCase(componentName); // 例如: AaBb
const exportName = `Se${formattedName}`; // 例如: SeAaBb

// 定义路径
// 文件夹保持原始命名 (packages/components/aa-bb)
const targetDir = path.resolve(
    __dirname,
    `../packages/components/${componentName}`
);
const srcDir = path.join(targetDir, "src");
const testDir = path.join(targetDir, "__tests__");

const entryFile = path.resolve(
    __dirname,
    "../packages/solid-element-ui/index.ts"
);

// 检查文件夹是否已存在
if (fs.existsSync(targetDir)) {
    console.error(`❌ 组件 ${componentName} 已存在于 packages/components/ 中`);
    process.exit(1);
}

// 创建文件夹结构
fs.mkdirSync(srcDir, { recursive: true });
fs.mkdirSync(testDir, { recursive: true });

// --- 生成模板内容 ---

// 1. 组件主文件 (例如 AaBb.tsx)
const componentTemplate = `import { splitProps, type ParentComponent } from "solid-js";
import { cn } from "@/utils/cn";
import { type ${formattedName}Props } from "./setting";

export const ${exportName}: ParentComponent<${formattedName}Props> = (props: ${formattedName}Props) => {
    const [local, others] = splitProps(props, ["children", "class"]);

    return (
        <div class={cn("${componentName}", local.class)} {...others}>
            {local.children}
        </div>
    );
};
`;

// 2. setting.ts (类型定义)
const settingTemplate = `import { type JSX } from "solid-js";

export interface ${formattedName}Props extends JSX.HTMLAttributes<HTMLDivElement> {
    // 可以在这里添加自定义属性
}
`;

// 3. 测试文件 (例如 AaBb.test.tsx)
const testTemplate = `import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { ${exportName} } from "../src/${formattedName}";

describe("${exportName}", () => {
    it("should render correctly", () => {
        render(() => <${exportName}>${exportName}</${exportName}>);
        expect(screen.getByText("${exportName}")).toBeInTheDocument();
    });
});
`;

// --- 写入文件 ---

// 写入主组件文件 (使用 PascalCase 命名文件: AaBb.tsx)
fs.writeFileSync(path.join(srcDir, `${formattedName}.tsx`), componentTemplate);

// 写入 setting.ts
fs.writeFileSync(path.join(srcDir, `setting.ts`), settingTemplate);

// 写入测试文件
fs.writeFileSync(path.join(testDir, `${formattedName}.test.tsx`), testTemplate);

// 6. 关键步骤：自动追加 Export 到入口文件
if (fs.existsSync(entryFile)) {
    // 这里的路径映射需根据你的 tsconfig paths 确定，此处匹配你原始代码逻辑
    const exportStatement = `export { ${exportName} } from "@/components/${componentName}/src/${formattedName}.tsx";`;

    const currentContent = fs.readFileSync(entryFile, "utf-8");
    if (!currentContent.includes(exportStatement)) {
        const tailNewline = currentContent.endsWith("\n") ? "" : "\n";
        fs.appendFileSync(entryFile, `${tailNewline}${exportStatement}\n`);
        console.log(`✅ 已同步导出到 solid-element-ui/index.ts`);
    }
} else {
    console.warn(`⚠️ 未找到入口文件: ${entryFile}，请手动配置导出`);
}

console.log(`
✅ 组件 ${componentName} 创建成功！
📂 路径: packages/components/${componentName}
✨ 导出组件: ${exportName}
📝 接口名称: ${formattedName}Props

已生成文件:
- src/${formattedName}.tsx
- src/setting.ts
- __tests__/${formattedName}.test.tsx
`);
