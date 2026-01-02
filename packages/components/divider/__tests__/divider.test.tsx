import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeDivider } from "../src/divider";

describe("SeDivider", () => {
    it("should render correctly", () => {
        render(() => <SeDivider />);
        expect(screen.getByText("SeDivider")).toBeInTheDocument();
    });
});
