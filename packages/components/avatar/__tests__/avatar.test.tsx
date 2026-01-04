import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeAvatar } from "../src/avatar";

describe("SeAvatar", () => {
    it("should render correctly", () => {
        render(() => <SeAvatar>SeAvatar</SeAvatar>);
        expect(screen.getByText("SeAvatar")).toBeInTheDocument();
    });
});
