import { Accordion as K } from "@kobalte/core/accordion";

export const Accordion = ()=>{
    return (
        <K class="accordion" defaultValue={["item-1"]}>
            <K.Item class="accordion__item" value="item-1">
                <K.Header class="accordion__item-header">
                    <K.Trigger class="accordion__item-trigger">
                        <span>Is it accessible?</span>
                      
                    </K.Trigger>
                </K.Header>
                <K.Content class="accordion__item-content">
                    <p class="accordion__item-content-text">
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </p>
                </K.Content>
            </K.Item>
            <K.Item class="accordion__item" value="item-2">
                <K.Header class="accordion__item-header">
                    <K.Trigger class="accordion__item-trigger">
                        <span>Is it unstyled?</span>
                        
                    </K.Trigger>
                </K.Header>
                <K.Content class="accordion__item-content">
                    <p class="accordion__item-content-text">
                        Yes. It's unstyled by default, giving you freedom over
                        the look and feel.
                    </p>
                </K.Content>
            </K.Item>
            <K.Item class="accordion__item" value="item-3">
                <K.Header class="accordion__item-header">
                    <K.Trigger class="accordion__item-trigger">
                        <span>Can it be animated?</span>
                        
                    </K.Trigger>
                </K.Header>
                <K.Content class="accordion__item-content">
                    <p class="accordion__item-content-text">
                        Yes! You can animate the Accordion with CSS or
                        JavaScript.
                    </p>
                </K.Content>
            </K.Item>
        </K>
    );
}

