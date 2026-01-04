import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeWatermark } from "../src/watermark";

describe("SeWatermark", () => {
    it("should render correctly", () => {
        render(() => <SeWatermark>SeWatermark</SeWatermark>);
        expect(screen.getByText("SeWatermark")).toBeInTheDocument();
    });
});
