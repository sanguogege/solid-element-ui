import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeInputTag } from "../src/inputTag";

describe("SeInputTag", () => {
    it("should render correctly", () => {
        render(() => <SeInputTag>SeInputTag</SeInputTag>);
        expect(screen.getByText("SeInputTag")).toBeInTheDocument();
    });
});
