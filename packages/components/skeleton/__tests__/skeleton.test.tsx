import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeSkeleton } from "../src/skeleton";

describe("SeSkeleton", () => {
    it("should render correctly", () => {
        render(() => <SeSkeleton>SeSkeleton</SeSkeleton>);
        expect(screen.getByText("SeSkeleton")).toBeInTheDocument();
    });
});
