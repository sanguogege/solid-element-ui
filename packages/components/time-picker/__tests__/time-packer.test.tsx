import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeTimePacker } from "../src/time-picker";

describe("SeTimePacker", () => {
    it("should render correctly", () => {
        render(() => <SeTimePacker>SeTimePacker</SeTimePacker>);
        expect(screen.getByText("SeTimePacker")).toBeInTheDocument();
    });
});
