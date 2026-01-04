import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeSegmented } from "../src/segmented";

describe("SeSegmented", () => {
    it("should render correctly", () => {
        render(() => <SeSegmented>SeSegmented</SeSegmented>);
        expect(screen.getByText("SeSegmented")).toBeInTheDocument();
    });
});
