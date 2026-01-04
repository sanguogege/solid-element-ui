import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeSlider } from "../src/Slider";

describe("SeSlider", () => {
    it("should render correctly", () => {
        render(() => <SeSlider>SeSlider</SeSlider>);
        expect(screen.getByText("SeSlider")).toBeInTheDocument();
    });
});
