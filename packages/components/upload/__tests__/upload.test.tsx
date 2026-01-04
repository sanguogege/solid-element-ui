import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeUpload } from "../src/upload";

describe("SeUpload", () => {
    it("should render correctly", () => {
        render(() => <SeUpload>SeUpload</SeUpload>);
        expect(screen.getByText("SeUpload")).toBeInTheDocument();
    });
});
