import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeTree } from "../src/tree";

describe("SeTree", () => {
    it("should render correctly", () => {
        render(() => <SeTree>SeTree</SeTree>);
        expect(screen.getByText("SeTree")).toBeInTheDocument();
    });
});
