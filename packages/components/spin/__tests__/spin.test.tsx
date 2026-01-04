import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeSpin } from "../src/spin";

describe("SeSpin", () => {
    it("should render correctly", () => {
        render(() => <SeSpin>SeSpin</SeSpin>);
        expect(screen.getByText("SeSpin")).toBeInTheDocument();
    });
});
