import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeDescriptions } from "../src/description";

describe("SeDescriptions", () => {
    it("should render correctly", () => {
        render(() => <SeDescriptions>SeDescriptions</SeDescriptions>);
        expect(screen.getByText("SeDescriptions")).toBeInTheDocument();
    });
});
