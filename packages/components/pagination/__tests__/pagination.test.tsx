import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SePagination } from "../src/pagination";

describe("SePagination", () => {
    it("should render correctly", () => {
        render(() => <SePagination>SePagination</SePagination>);
        expect(screen.getByText("SePagination")).toBeInTheDocument();
    });
});
