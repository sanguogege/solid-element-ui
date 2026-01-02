
import { SeButton, SeAffix } from "../packages/solid-element-ui";

export default ()=>{
    return (
        <div style={{ height: "200vh", padding: "50px" }}>
            <SeAffix offsetTop={60}>
                <div class="se-bg-blue-500 se-text-white se-p-4 se-rounded se-shadow-lg">
                    我会固定在顶部 60px 处
                </div>
            </SeAffix>
        </div>
    );
}