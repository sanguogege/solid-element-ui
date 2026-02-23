import { FileField } from "solid-element-ui";
const DemoCode = () => {
    return (
        <div class="p-4 bg-white dark:bg-zinc-950 border rounded-lg space-y-2">
            <FileField
                label="附件上传"
                description="支持 PDF 格式"
                accept=".pdf"
                onChange={(files:any) => console.log(files)}
            />
        </div>
    );
};

export { DemoCode };
