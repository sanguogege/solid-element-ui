import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeMentions } from "../src/mentions";

describe("SeMentions", () => {
    it("should render correctly", () => {
        render(() => <SeMentions>SeMentions</SeMentions>);
        expect(screen.getByText("SeMentions")).toBeInTheDocument();
    });
});
