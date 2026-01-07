import {
    splitProps,
    type ParentComponent,
    onMount,
    onCleanup,
    createSignal,
    createEffect,
} from "solid-js";
import { type WatermarkProps } from "./setting";

export const SeWatermark: ParentComponent<WatermarkProps> = (props) => {
    const [local, others] = splitProps(props, [
        "content",
        "image",
        "width",
        "height",
        "rotate",
        "font",
        "gap",
        "offset",
        "antitamper",
        "class",
        "children",
    ]);

    const [watermarkUrl, setWatermarkUrl] = createSignal("");
    let containerRef: HTMLDivElement | undefined;
    let observer: MutationObserver | undefined;

    // 1. 生成水印图片 Base64
    const renderWatermark = () => {
        const canvas = document.createElement("canvas");
        const ratio = window.devicePixelRatio || 1;
        const width = local.width || 120;
        const height = local.height || 64;
        const gapX = local.gap?.[0] ?? 100;
        const gapY = local.gap?.[1] ?? 100;
        const canvasWidth = width + gapX;
        const canvasHeight = height + gapY;

        canvas.width = canvasWidth * ratio;
        canvas.height = canvasHeight * ratio;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(ratio, ratio);

        const rotate = (local.rotate ?? -22) * (Math.PI / 180);
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate(rotate);

        if (local.image) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = local.image;
            img.onload = () => {
                ctx.drawImage(img, -width / 2, -height / 2, width, height);
                setWatermarkUrl(canvas.toDataURL());
            };
        } else {
            const font = local.font || {};
            ctx.fillStyle = font.color || "rgba(0,0,0,0.15)";
            ctx.font = `${font.fontWeight || "normal"} ${
                font.fontSize || 16
            }px ${font.fontFamily || "sans-serif"}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const contents = Array.isArray(local.content)
                ? local.content
                : [local.content || "solid-element-ui"];
            contents.forEach((text, index) => {
                ctx.fillText(
                    text as string,
                    0,
                    index * ((font.fontSize || 16) + 4)
                );
            });
            setWatermarkUrl(canvas.toDataURL());
        }
    };

    // 2. 防篡改逻辑
    const startObserve = () => {
        if (!local.antitamper || !containerRef) return;
        observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                // 如果背景样式被修改或水印节点被删除，重新渲染
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "style"
                ) {
                    renderWatermark();
                }
            }
        });
        observer.observe(containerRef, {
            attributes: true,
            childList: true,
            subtree: true,
        });
    };

    onMount(() => {
        renderWatermark();
        startObserve();
    });

    onCleanup(() => {
        observer?.disconnect();
    });

    // 响应式更新
    createEffect(() => {
        renderWatermark();
    });

    return (
        <div
            {...others}
            ref={containerRef}
            class={`relative overflow-hidden ${local.class || ""}`}
        >
            {local.children}
            <div
                class="absolute inset-0 pointer-events-none z-[9999] transition-none"
                style={{
                    "background-image": `url(${watermarkUrl()})`,
                    "background-repeat": "repeat",
                    "background-position": `${local.offset?.[0] ?? 0}px ${
                        local.offset?.[1] ?? 0
                    }px`,
                }}
            />
        </div>
    );
};
