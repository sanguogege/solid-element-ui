import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeDrawer } from "../src/drawer";

describe("SeDrawer", () => {
    it("should render correctly", () => {
        render(() => <SeDrawer>SeDrawer</SeDrawer>);
        expect(screen.getByText("SeDrawer")).toBeInTheDocument();
    });
});
