import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeRadio } from "../src/radio";

describe("SeRadio", () => {
    it("should render correctly", () => {
        render(() => <SeRadio>SeRadio</SeRadio>);
        expect(screen.getByText("SeRadio")).toBeInTheDocument();
    });
});
