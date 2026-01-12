import { Progress as KProgress } from "@kobalte/core/progress";
import { splitProps, type ComponentProps } from "solid-js";
import { progressVariants } from "./setting";

const styles = progressVariants();

// --- 扁平化组件定义 ---

export const ProgressLabel = (
    props: ComponentProps<typeof KProgress.Label>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KProgress.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

export const ProgressValueLabel = (
    props: ComponentProps<typeof KProgress.ValueLabel>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KProgress.ValueLabel
            class={styles.valueText({ class: local.class })}
            {...others}
        />
    );
};

export const ProgressTrack = (
    props: ComponentProps<typeof KProgress.Track>
) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KProgress.Track
            class={styles.track({ class: local.class })}
            {...others}
        >
            {local.children}
            <KProgress.Fill class={styles.fill()} />
        </KProgress.Track>
    );
};

export const ProgressRoot = (props: ComponentProps<typeof KProgress>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KProgress class={styles.root({ class: local.class })} {...others}>
            {local.children}
        </KProgress>
    );
};

// --- 聚合导出 (Namespace) ---

export const Progress = Object.assign(ProgressRoot, {
    Label: ProgressLabel,
    ValueLabel: ProgressValueLabel,
    Track: ProgressTrack,
});
