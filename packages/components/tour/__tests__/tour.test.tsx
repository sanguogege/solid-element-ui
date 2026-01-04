import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeTour } from "../src/tour";

describe("SeTour", () => {
    it("should render correctly", () => {
        render(() => <SeTour>SeTour</SeTour>);
        expect(screen.getByText("SeTour")).toBeInTheDocument();
    });
});
