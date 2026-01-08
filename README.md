## Usage

### This is a trial version.

### it dependence on tailwindcss

### you must to install tailwindcss

```bash
    bun add tailwindcss @tailwindcss/vite

    bun add solid-element-ui
```

```css
@import "tailwindcss";

@source "../node_modules/solid-element-ui/dist/**/*.js";
```

### it has a preset style. you can change with class in tailwindcss,or style

```tsx
import { Button } from "solid-element-ui";

<Button
    variant="success"
    style="color:red;"
    class="text-black-700 bg-amber-500 border-b-blue-950"
>
    Hello tailwind!
</Button>;
```
