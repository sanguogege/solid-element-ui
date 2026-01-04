import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeImage } from "../src/image";

describe("SeImage", () => {
    it("should render correctly", () => {
        render(() => <SeImage>SeImage</SeImage>);
        expect(screen.getByText("SeImage")).toBeInTheDocument();
    });
});
