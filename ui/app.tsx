
import { SeButton ,SeButtonGroup} from "../packages/solid-element-ui";

export default ()=>{
    return (
        <div style="padding:60px">
            <SeButton variant="primary">Primary Button</SeButton>
            <SeButton variant="danger" class="rounded-xl" outline={true}>
                danger Button
            </SeButton>
            <SeButton variant="text" outline={true} round={true}>
                danger Button
            </SeButton>

            <SeButtonGroup variant="primary">
                <SeButton>Primary Button</SeButton>
                <SeButton>danger Button</SeButton>
                <SeButton>danger </SeButton>
                <SeButton>danger Button</SeButton>
            </SeButtonGroup>
        </div>
    );
}