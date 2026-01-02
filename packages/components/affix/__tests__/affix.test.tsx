import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeAffix } from "../src/affix";

describe("SeAffix", () => {
    it("should render correctly", () => {
        render(() => <SeAffix />);
        expect(screen.getByText("SeAffix")).toBeInTheDocument();
    });
});
