import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeInputNumber } from "../src/InputNumber";

describe("SeInputNumber", () => {
    it("should render correctly", () => {
        render(() => <SeInputNumber>SeInputNumber</SeInputNumber>);
        expect(screen.getByText("SeInputNumber")).toBeInTheDocument();
    });
});
