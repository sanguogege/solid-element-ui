import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeAnchor } from "../src/anchor";

describe("SeAnchor", () => {
    it("should render correctly", () => {
        render(() => <SeAnchor />);
        expect(screen.getByText("SeAnchor")).toBeInTheDocument();
    });
});
