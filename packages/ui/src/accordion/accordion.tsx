import { Accordion as K } from "@kobalte/core/accordion";
import { For, splitProps } from "solid-js"; // 引入 splitProps
import { accordionStyles } from "./setting";
import HeroiconsChevronDownSolid from "~icons/heroicons/chevron-down-solid";

export const Accordion = (props: any) => {
    const [local, rest] = splitProps(props, [
        "items",
        "borderless",
        "class", // 提取外部传入的 class 以便后续合并
    ]);

    // 2. 生成样式槽位
    // 将 local.borderless 传给样式生成器
    const { root, item, header, trigger, content, contentText, icon } =
        accordionStyles({
            borderless: local.borderless,
        });

    return (
        // 3. 将 rest 透传给底层组件 K.Root
        // 使用 root() 生成基础类名，并与外部传入的 local.class 合并
        <K {...rest} class={root({ class: local.class })}>
            <For each={local.items}>
                {(itemData, index) => (
                    <K.Item
                        class={item()}
                        value={itemData.value || `item-${index()}`}
                    >
                        <K.Header class={header()}>
                            <K.Trigger class={trigger()}>
                                <span>{itemData.title}</span>
                                <HeroiconsChevronDownSolid class={icon()} />
                            </K.Trigger>
                        </K.Header>
                        <K.Content class={content()}>
                            <div class={contentText()}>{itemData.content}</div>
                        </K.Content>
                    </K.Item>
                )}
            </For>
        </K>
    );
};
