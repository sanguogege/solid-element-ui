

import {
    SeAnchor,
    SeAnchorLink,
    SeDivider,
} from "../packages/solid-element-ui";


export default ()=>{
    return (
        <>
            <SeDivider />
            // 2. 带文字的分割线
            <SeDivider contentPosition="left" class="border-red-500">今日资讯</SeDivider>
            // 3. 虚线模式
            <SeDivider dashed />
            // 4. 垂直分割
            <span>插件</span>
            <SeDivider direction="vertical" />
            <span>设置</span>
        </>
    );
}