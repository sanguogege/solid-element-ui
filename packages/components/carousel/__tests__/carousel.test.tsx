import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeCarousel } from "../src/carousel";

describe("SeCarousel", () => {
    it("should render correctly", () => {
        render(() => <SeCarousel>SeCarousel</SeCarousel>);
        expect(screen.getByText("SeCarousel")).toBeInTheDocument();
    });
});
