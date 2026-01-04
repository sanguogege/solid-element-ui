import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeProgress } from "../src/progress";

describe("SeProgress", () => {
    it("should render correctly", () => {
        render(() => <SeProgress>SeProgress</SeProgress>);
        expect(screen.getByText("SeProgress")).toBeInTheDocument();
    });
});
