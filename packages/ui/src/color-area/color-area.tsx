import { ColorArea as KColorArea } from "@kobalte/core/color-area";
import { splitProps, type ComponentProps } from "solid-js";
import { tv } from "tailwind-variants";

const colorAreaStyles = tv(
    {
        slots: {
            root: "relative h-48 w-full shrink-0 rounded-lg border border-zinc-200 dark:border-zinc-800 touch-none",
            background: "h-full w-full rounded-[inherit]",
            thumb: [
                "z-10 h-5 w-5 rounded-full border-2 border-white bg-transparent shadow-md transition-[transform]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2",
                "hover:scale-110 active:scale-90 cursor-grab active:cursor-grabbing",
            ],
        },
    },
    {
        twMerge: true,
    },
);

const { root, background, thumb } = colorAreaStyles();

export interface ColorAreaProps extends ComponentProps<typeof KColorArea> {}

export const ColorArea = (props: ColorAreaProps) => {
    const [local, others] = splitProps(props, ["class"]);

    return (
        <KColorArea class={root({ class: local.class })} {...others}>
            <KColorArea.Background
                class={background()}
                // 默认背景，通常实际使用时会根据 Hue 滑块动态改变这里的红色部分
                style={{
                    background:
                        "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), red",
                }}
            />
            <KColorArea.Thumb class={thumb()}>
                {/* 修复点：ColorArea 需要分别定义 X 和 Y 的隐藏输入框 */}
                <KColorArea.HiddenInputX />
                <KColorArea.HiddenInputY />
            </KColorArea.Thumb>
        </KColorArea>
    );
};
