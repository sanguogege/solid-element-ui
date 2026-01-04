import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeTooltip } from "../src/tooltip";

describe("SeTooltip", () => {
    it("should render correctly", () => {
        render(() => <SeTooltip>SeTooltip</SeTooltip>);
        expect(screen.getByText("SeTooltip")).toBeInTheDocument();
    });
});
