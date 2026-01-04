import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeBadge } from "../src/badge";

describe("SeBadge", () => {
    it("should render correctly", () => {
        render(() => <SeBadge>SeBadge</SeBadge>);
        expect(screen.getByText("SeBadge")).toBeInTheDocument();
    });
});
