// import { TimeField as KTimeField } from "@kobalte/core/time-field";
// import { splitProps, type ComponentProps, For } from "solid-js";
// import { timeFieldVariants } from "./setting";

// const styles = timeFieldVariants();

// // --- 扁平化组件定义 ---

// export const TimeFieldRoot = (props: ComponentProps<typeof KTimeField>) => {
//     const [local, others] = splitProps(props, ["class"]);
//     return (
//         <KTimeField class={styles.root({ class: local.class })} {...others} />
//     );
// };

// export const TimeFieldLabel = (
//     props: ComponentProps<typeof KTimeField.Label>
// ) => {
//     const [local, others] = splitProps(props, ["class"]);
//     return (
//         <KTimeField.Label
//             class={styles.label({ class: local.class })}
//             {...others}
//         />
//     );
// };

// export const TimeFieldInput = (
//     props: ComponentProps<typeof KTimeField.Input>
// ) => {
//     const [local, others] = splitProps(props, ["class"]);
//     return (
//         <KTimeField.Input
//             class={styles.input({ class: local.class })}
//             {...others}
//         >
//             {(state) => (
//                 <For each={state.segments()}>
//                     {(segment) => (
//                         <KTimeField.Segment
//                             segment={segment}
//                             class={styles.segment()}
//                         />
//                     )}
//                 </For>
//             )}
//         </KTimeField.Input>
//     );
// };

// // --- 聚合导出 (Namespace) ---

// export const TimeField = Object.assign(TimeFieldRoot, {
//     Label: TimeFieldLabel,
//     Input: TimeFieldInput,
//     Description: KTimeField.Description,
//     ErrorMessage: KTimeField.ErrorMessage,
// });
