import fs from "node:fs";
import path from "node:path";

// 目标目录：components 文件夹路径
const componentsDir = path.resolve(
    process.cwd(),
    "packages/solid-element-ui/components"
);

console.log(componentsDir);

async function moveSrcFiles() {
    try {
        // 1. 读取 components 下的所有子文件夹 (如 button, affix 等)
        const folders = fs.readdirSync(componentsDir);

        for (const folder of folders) {
            const componentPath = path.join(componentsDir, folder);
            const srcPath = path.join(componentPath, "src");

            // 检查子文件夹中是否存在 src 目录
            if (fs.existsSync(srcPath) && fs.lstatSync(srcPath).isDirectory()) {
                console.log(`正在处理组件: ${folder}...`);

                // 2. 读取 src 目录下的所有文件
                const files = fs.readdirSync(srcPath);

                for (const file of files) {
                    const oldPath = path.join(srcPath, file);
                    const newPath = path.join(componentPath, file);

                    // 3. 移动文件到组件文件夹根部
                    fs.renameSync(oldPath, newPath);
                    console.log(`  - 移动: ${file}`);
                }

                // 4. 删除已经排空的 src 文件夹
                fs.rmdirSync(srcPath);
                console.log(`  ✓ 已删除 ${folder}/src 文件夹`);
            }
        }
        console.log("\n所有组件目录结构优化完毕！");
    } catch (error) {
        console.error("处理过程中出现错误:", error);
    }
}

moveSrcFiles();
