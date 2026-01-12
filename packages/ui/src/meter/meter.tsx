import { Meter as KMeter } from "@kobalte/core/meter";
import { splitProps, type ComponentProps } from "solid-js";
import { meterVariants } from "./setting";

const styles = meterVariants();

// --- 扁平化组件定义 ---

export const MeterLabel = (props: ComponentProps<typeof KMeter.Label>) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KMeter.Label
            class={styles.label({ class: local.class })}
            {...others}
        />
    );
};

// 修正：将 ValueText 改为 ValueLabel
export const MeterValueLabel = (
    props: ComponentProps<typeof KMeter.ValueLabel>
) => {
    const [local, others] = splitProps(props, ["class"]);
    return (
        <KMeter.ValueLabel
            class={styles.valueText({ class: local.class })}
            {...others}
        />
    );
};

export const MeterTrack = (props: ComponentProps<typeof KMeter.Track>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KMeter.Track class={styles.track({ class: local.class })} {...others}>
            {local.children}
            <KMeter.Fill class={styles.fill()} />
        </KMeter.Track>
    );
};

export const MeterRoot = (props: ComponentProps<typeof KMeter>) => {
    const [local, others] = splitProps(props, ["class", "children"]);
    return (
        <KMeter class={styles.root({ class: local.class })} {...others}>
            {local.children}
        </KMeter>
    );
};

// --- 聚合导出 (Namespace) ---

export const Meter = Object.assign(MeterRoot, {
    Label: MeterLabel,
    ValueLabel: MeterValueLabel, // 修正此处命名
    Track: MeterTrack,
});
