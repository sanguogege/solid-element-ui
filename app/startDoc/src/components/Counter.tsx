import { createSignal } from "solid-js";

import { SeButton } from "solid-element-ui";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <SeButton  class="text-red-600" onClick={() => setCount(count() + 1)} >
      Clicks: {count()}
    </SeButton>
  );
}
