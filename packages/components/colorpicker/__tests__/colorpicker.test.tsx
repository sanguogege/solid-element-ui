import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeColorpicker } from "../src/colorpicker";

describe("SeColorpicker", () => {
    it("should render correctly", () => {
        render(() => <SeColorpicker />);
        expect(screen.getByText("SeColorpicker")).toBeInTheDocument();
    });
});
