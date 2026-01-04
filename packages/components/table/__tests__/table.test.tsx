import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeTable } from "../src/table";

describe("SeTable", () => {
    it("should render correctly", () => {
        render(() => <SeTable>SeTable</SeTable>);
        expect(screen.getByText("SeTable")).toBeInTheDocument();
    });
});
