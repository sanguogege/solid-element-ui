import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeTag } from "../src/tag";

describe("SeTag", () => {
    it("should render correctly", () => {
        render(() => <SeTag>SeTag</SeTag>);
        expect(screen.getByText("SeTag")).toBeInTheDocument();
    });
});
