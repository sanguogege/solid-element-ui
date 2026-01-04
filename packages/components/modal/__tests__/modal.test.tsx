import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeModal } from "../src/modal";

describe("SeModal", () => {
    it("should render correctly", () => {
        render(() => <SeModal>SeModal</SeModal>);
        expect(screen.getByText("SeModal")).toBeInTheDocument();
    });
});
