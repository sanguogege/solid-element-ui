import { createSignal } from "solid-js";
import { SeUpload, type UploadFile } from "../packages/solid-element-ui";

export default function UploadDemo() {
  const [fileList, setFileList] = createSignal<UploadFile[]>([]);

  const handleRemove = (file: UploadFile) => {
    setFileList(prev => prev.filter(item => item.uid !== file.uid));
  };

  return (
    <div class="p-10 max-w-md">
      <h3 class="mb-4 text-sm font-medium">附件上传:</h3>
      
      {/* 拖拽上传模式 */}
      <SeUpload 
        drag 
        multiple 
        fileList={fileList()} 
        onChange={(info) => setFileList(info.fileList)}
        onRemove={handleRemove}
        accept=".jpg,.png,.pdf"
      >
        <div class="flex flex-col items-center">
          <svg class="w-10 h-10 text-[#1677ff] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p class="text-[14px] text-[#000000d9]">点击或将文件拖拽到此区域上传</p>
          <p class="text-[12px] text-[#00000073] mt-1">支持扩展名：.jpg, .png, .pdf</p>
        </div>
      </SeUpload>
    </div>
  );
}
