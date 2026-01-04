import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SePopover } from "../src/popover";

describe("SePopover", () => {
    it("should render correctly", () => {
        render(() => <SePopover>SePopover</SePopover>);
        expect(screen.getByText("SePopover")).toBeInTheDocument();
    });
});
