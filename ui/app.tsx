

import {
    SeAnchor,
    SeAnchorLink,
} from "../packages/solid-element-ui";


export default ()=>{
    return (
        <div class="flex">
            {/* 左侧锚点导航 */}
            <div class="w-40 fixed">
                <SeAnchor offset={70}>
                    <SeAnchorLink href="#part1" title="第一部分" />
                    <SeAnchorLink href="#part2" title="第二部分" />
                    <SeAnchorLink href="#part3" title="第三部分" />
                </SeAnchor>
            </div>

            {/* 右侧内容区 */}
            <div class="ml-48">
                <section id="part1" class="h-[800px]">
                    内容 1
                </section>
                <section id="part2" class="h-[800px]">
                    内容 2
                </section>
                <section id="part3" class="h-[800px]">
                    内容 3
                </section>
            </div>
        </div>
    );
}