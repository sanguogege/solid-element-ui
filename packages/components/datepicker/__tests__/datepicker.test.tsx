import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeDatepicker } from "../src/datepicker";

describe("SeDatepicker", () => {
    it("should render correctly", () => {
        render(() => <SeDatepicker />);
        expect(screen.getByText("SeDatepicker")).toBeInTheDocument();
    });
});
