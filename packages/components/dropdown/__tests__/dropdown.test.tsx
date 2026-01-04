import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeDropdown } from "../src/dropdown";

describe("SeDropdown", () => {
    it("should render correctly", () => {
        render(() => <SeDropdown>SeDropdown</SeDropdown>);
        expect(screen.getByText("SeDropdown")).toBeInTheDocument();
    });
});
