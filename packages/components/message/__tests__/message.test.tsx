import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeMessage } from "../src/message";

describe("SeMessage", () => {
    it("should render correctly", () => {
        render(() => <SeMessage>SeMessage</SeMessage>);
        expect(screen.getByText("SeMessage")).toBeInTheDocument();
    });
});
