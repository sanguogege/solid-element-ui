import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeEmpty } from "../src/empty";

describe("SeEmpty", () => {
    it("should render correctly", () => {
        render(() => <SeEmpty>SeEmpty</SeEmpty>);
        expect(screen.getByText("SeEmpty")).toBeInTheDocument();
    });
});
