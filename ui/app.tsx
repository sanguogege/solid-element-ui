
import { SeBreadcrumb, SeBreadcrumbItem } from "../packages/solid-element-ui";


export default ()=>{
    return (
        <SeBreadcrumb separator="/">
            <SeBreadcrumbItem href="/">首页</SeBreadcrumbItem>
            <SeBreadcrumbItem href="/components">组件</SeBreadcrumbItem>
            <SeBreadcrumbItem>面包屑</SeBreadcrumbItem>
        </SeBreadcrumb>
    );
}