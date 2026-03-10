import { useLocation } from "@solidjs/router";
import { createEffect, createSignal, onMount } from "solid-js";
import { Select } from "solid-element-ui";
import { isServer } from "solid-js/web";

const options = [
    { label: "light", value: "light" },
    { label: "dark", value: "dark" },
];

export default () => {
  const [value, setValue] = createSignal("light"); 

  onMount(() => {
      const saved = localStorage.getItem("theme");
      if (saved) setValue(saved);
  });

  createEffect(() => {
      const val = value();
      if (!isServer) {
          document.documentElement.setAttribute("data-theme", val);
          localStorage.setItem("theme", val);
      }
  });

    const location = useLocation();

    const active = (path: string) =>
        path == location.pathname
            ? "bg-sky-600"
            : "border-transparent hover:border-sky-600";
    return (
        <nav class="flex bg-sky-800">
            <ul class="container flex items-center p-3 text-gray-200">
                <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                    <a href="/">Home</a>
                </li>
            </ul>
            <div class="flex not-prose items-center">
                <Select
                    value={value()}
                    options={options}
                    onChange={setValue}
                />
            </div>
        </nav>
    );
};


