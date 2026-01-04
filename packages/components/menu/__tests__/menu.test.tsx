import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeMenu } from "../src/menu";

describe("SeMenu", () => {
    it("should render correctly", () => {
        render(() => <SeMenu>SeMenu</SeMenu>);
        expect(screen.getByText("SeMenu")).toBeInTheDocument();
    });
});
