import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeAlert } from "../src/alert";

describe("SeAlert", () => {
    it("should render correctly", () => {
        render(() => <SeAlert>SeAlert</SeAlert>);
        expect(screen.getByText("SeAlert")).toBeInTheDocument();
    });
});
