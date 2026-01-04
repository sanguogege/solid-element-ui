import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeSwitch } from "../src/switch";

describe("SeSwitch", () => {
    it("should render correctly", () => {
        render(() => <SeSwitch>SeSwitch</SeSwitch>);
        expect(screen.getByText("SeSwitch")).toBeInTheDocument();
    });
});
