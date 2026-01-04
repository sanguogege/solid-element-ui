import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeInput } from "../src/Input";

describe("SeInput", () => {
    it("should render correctly", () => {
        render(() => <SeInput>SeInput</SeInput>);
        expect(screen.getByText("SeInput")).toBeInTheDocument();
    });
});
