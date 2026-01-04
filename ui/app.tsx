import { createSignal } from "solid-js";
import { SeTreeSelect } from "../packages/solid-element-ui";

export default function TreeSelectDemo() {
  const [val, setVal] = createSignal<string | number>("leaf1");

  const treeData = [
    {
      label: "后端架构",
      value: "backend",
      children: [
        { label: "Node.js", value: "nodejs" },
        { label: "Go 语言", value: "go", disabled: true },
      ],
    },
    {
      label: "前端技术",
      value: "frontend",
      children: [
        {
          label: "框架",
          value: "frameworks",
          children: [
            { label: "Solid.js", value: "leaf1" },
            { label: "React", value: "leaf2" },
          ],
        },
      ],
    },
  ];

  return (
    <div class="p-20 max-w-[320px]">
      <SeTreeSelect 
        options={treeData} 
        value={val()} 
        onChange={(v) => setVal(v)} 
        placeholder="请选择组织架构"
      />
      <div class="mt-4 text-xs text-gray-400 font-mono">
        Value: {val()}
      </div>
    </div>
  );
}
