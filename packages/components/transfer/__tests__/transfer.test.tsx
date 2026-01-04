import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeTransfer } from "../src/transfer";

describe("SeTransfer", () => {
    it("should render correctly", () => {
        render(() => <SeTransfer>SeTransfer</SeTransfer>);
        expect(screen.getByText("SeTransfer")).toBeInTheDocument();
    });
});
