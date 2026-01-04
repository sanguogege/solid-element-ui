import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeCheckbox } from "../src/checkbox";

describe("SeCheckbox", () => {
    it("should render correctly", () => {
        render(() => <SeCheckbox />);
        expect(screen.getByText("SeCheckbox")).toBeInTheDocument();
    });
});
