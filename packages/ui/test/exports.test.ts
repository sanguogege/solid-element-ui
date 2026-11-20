import { expect, it } from "vite-plus/test";

import { Button as PackageButton } from "solid-element-ui";

import { Button } from "../core/button/button";

it("resolves the package entry through package.json exports", () => {
  expect(PackageButton).toBe(Button);
});
