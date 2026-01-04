import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeForm } from "../src/form";

describe("SeForm", () => {
    it("should render correctly", () => {
        render(() => <SeForm />);
        expect(screen.getByText("SeForm")).toBeInTheDocument();
    });
});
