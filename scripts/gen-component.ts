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
const pascalName = toPascalCase(componentName); // 例如: CoolButton
const exportName = `Se${pascalName}`; // 例如: SeCoolButton
const propsName = `${pascalName}Props`; // 例如: CoolButtonProps

// 定义路径
// 文件夹和文件名都使用原始的 componentName (kebab-case)
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

// 1. 组件主文件 (文件名: cool-button.tsx)
const componentTemplate = `import { splitProps, type ParentComponent } from "solid-js";
import { cn } from "solid-element-ui/utils/cn";
import { type ${propsName} } from "./setting";

export const ${exportName}: ParentComponent<${propsName}> = (props: ${propsName}) => {
    const [local, others] = splitProps(props, ["children", "class"]);

    return (
        <div class={cn("${componentName}", local.class)} {...others}>
            {local.children}
        </div>
    );
};
`;

// 2. setting.ts
const settingTemplate = `import { type JSX } from "solid-js";

export interface ${propsName} extends JSX.HTMLAttributes<HTMLDivElement> {
    // 可以在这里添加自定义属性
}
`;


// --- 写入文件 ---

// 写入主组件文件 (使用 kebab-case 命名文件)
fs.writeFileSync(path.join(srcDir, `${componentName}.tsx`), componentTemplate);

// 写入 setting.ts
fs.writeFileSync(path.join(srcDir, `setting.ts`), settingTemplate);

// 写入测试文件 (使用 kebab-case 命名文件)

// 自动追加 Export 到入口文件
if (fs.existsSync(entryFile)) {
    const exportStatement = `export { ${exportName} } from "@/components/${componentName}/src/${componentName}.tsx";`;

    const currentContent = fs.readFileSync(entryFile, "utf-8");
    if (!currentContent.includes(exportStatement)) {
        const tailNewline = currentContent.endsWith("\n") ? "" : "\n";
        fs.appendFileSync(entryFile, `${tailNewline}${exportStatement}\n`);
        console.log(`✅ 已同步导出到 solid-element-ui/index.ts`);
    }
}

console.log(`
✅ 组件 ${componentName} 创建成功！
📂 路径: packages/components/${componentName}
✨ 导出组件名: ${exportName}
📝 接口名称: ${propsName}

已生成文件:
- src/${componentName}.tsx
- src/setting.ts
- __tests__/${componentName}.test.tsx
`);
