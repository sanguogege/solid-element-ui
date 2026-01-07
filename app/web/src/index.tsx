import { render } from "solid-js/web";

import App from "./app";

const root = document.getElementById("root");

render(
    () => (
        <div style={{ padding: "20px" }}>
            <App />
        </div>
    ),
    root!
);
