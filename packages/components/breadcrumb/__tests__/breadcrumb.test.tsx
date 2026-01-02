import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeBreadcrumb } from "../src/breadcrumb";

describe("SeBreadcrumb", () => {
    it("should render correctly", () => {
        render(() => <SeBreadcrumb />);
        expect(screen.getByText("SeBreadcrumb")).toBeInTheDocument();
    });
});
