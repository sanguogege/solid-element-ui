// import { RatingGroup as KRatingGroup } from "@kobalte/core/rating-group";
// import { splitProps, type ComponentProps } from "solid-js";
// import { ratingGroupVariants } from "./setting";
// import { Star } from "lucide-solid";

// const styles = ratingGroupVariants();

// // --- 扁平化组件定义 ---

// export const RatingGroupLabel = (
//     props: ComponentProps<typeof KRatingGroup.Label>
// ) => {
//     const [local, others] = splitProps(props, ["class"]);
//     return (
//         <KRatingGroup.Label
//             class={styles.label({ class: local.class })}
//             {...others}
//         />
//     );
// };

// export const RatingGroupControl = (
//     props: ComponentProps<typeof KRatingGroup.Control>
// ) => {
//     const [local, others] = splitProps(props, ["class"]);
//     return (
//         <KRatingGroup.Control
//             class={styles.control({ class: local.class })}
//             {...others}
//         />
//     );
// };

// export const RatingGroupItem = (
//     props: ComponentProps<typeof KRatingGroup.Item>
// ) => {
//     const [local, others] = splitProps(props, ["class", "children"]);
//     return (
//         <KRatingGroup.Item
//             class={styles.item({ class: local.class })}
//             {...others}
//         >
//             <KRatingGroup.ItemIndicator class={styles.itemIndicator()}>
//                 {local.children ?? <Star class="h-5 w-5 fill-current" />}
//             </KRatingGroup.ItemIndicator>
//         </KRatingGroup.Item>
//     );
// };

// export const RatingGroupRoot = (props: ComponentProps<typeof KRatingGroup>) => {
//     const [local, others] = splitProps(props, ["class", "children"]);
//     return (
//         <KRatingGroup class={styles.root({ class: local.class })} {...others}>
//             {local.children}
//             <KRatingGroup.HiddenInput />
//         </KRatingGroup>
//     );
// };

// // --- 聚合导出 (Namespace) ---

// export const RatingGroup = Object.assign(RatingGroupRoot, {
//     Label: RatingGroupLabel,
//     Control: RatingGroupControl,
//     Item: RatingGroupItem,
// });
