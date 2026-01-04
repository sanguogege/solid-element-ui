import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeMasonry } from "../src/masonry";

describe("SeMasonry", () => {
    it("should render correctly", () => {
        render(() => <SeMasonry>SeMasonry</SeMasonry>);
        expect(screen.getByText("SeMasonry")).toBeInTheDocument();
    });
});
