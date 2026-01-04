import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeCollapse } from "../src/collapse";

describe("SeCollapse", () => {
    it("should render correctly", () => {
        render(() => <SeCollapse>SeCollapse</SeCollapse>);
        expect(screen.getByText("SeCollapse")).toBeInTheDocument();
    });
});
