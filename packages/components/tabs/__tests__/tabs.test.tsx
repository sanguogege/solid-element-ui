import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeTabs } from "../src/tabs";

describe("SeTabs", () => {
    it("should render correctly", () => {
        render(() => <SeTabs>SeTabs</SeTabs>);
        expect(screen.getByText("SeTabs")).toBeInTheDocument();
    });
});
