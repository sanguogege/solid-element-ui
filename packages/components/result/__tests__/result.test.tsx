import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeResult } from "../src/result";

describe("SeResult", () => {
    it("should render correctly", () => {
        render(() => <SeResult>SeResult</SeResult>);
        expect(screen.getByText("SeResult")).toBeInTheDocument();
    });
});
