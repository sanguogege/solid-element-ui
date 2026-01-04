import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeRate } from "../src/Rate";

describe("SeRate", () => {
    it("should render correctly", () => {
        render(() => <SeRate>SeRate</SeRate>);
        expect(screen.getByText("SeRate")).toBeInTheDocument();
    });
});
