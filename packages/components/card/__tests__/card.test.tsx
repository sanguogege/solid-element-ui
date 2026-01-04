import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeCard } from "../src/card";

describe("SeCard", () => {
    it("should render correctly", () => {
        render(() => <SeCard>SeCard</SeCard>);
        expect(screen.getByText("SeCard")).toBeInTheDocument();
    });
});
