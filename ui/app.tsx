

import {
    SeDivider,
} from "../packages/solid-element-ui";


export default ()=>{
    return (
        <>
            <SeDivider />
            // 2. 带文字的分割线
            <SeDivider contentPosition="right" color="danger">
                今日资讯
            </SeDivider>
            // 3. 虚线模式
            <SeDivider dashed color="success" />
            // 4. 垂直分割
            <span>插件</span>
            <SeDivider color="#ddd">危险警告</SeDivider>
            <span>
                设置 <SeDivider direction="vertical" />
                撒旦
            </span>
        </>
    );
}