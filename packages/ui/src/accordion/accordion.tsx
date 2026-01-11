import { Accordion as K } from "@kobalte/core/accordion";
import { For } from "solid-js";

export const Accordion = (props:any) => {
    return (
        <K class="accordion" > 
            <For each={props.items}>
                {(item, index) => (
                    <K.Item class="accordion__item" value={`item-${index()}`}>
                        <K.Header class="accordion__item-header">
                            <K.Trigger class="accordion__item-trigger">
                                <span>{item.title}</span>
                                X
                            </K.Trigger>
                        </K.Header>
                        <K.Content class="accordion__item-content">
                            <p class="accordion__item-content-text">
                                {item.content}
                            </p>
                        </K.Content>
                    </K.Item>
                )}
            </For>
        </K>
    );
};
