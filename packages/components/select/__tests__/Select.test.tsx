import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeSelect } from "../src/select";

describe("SeSelect", () => {
    it("should render correctly", () => {
        render(() => <SeSelect>SeSelect</SeSelect>);
        expect(screen.getByText("SeSelect")).toBeInTheDocument();
    });
});
