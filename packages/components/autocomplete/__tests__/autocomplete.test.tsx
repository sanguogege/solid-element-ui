import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeAutocomplete } from "../src/autocomplete";

describe("SeAutocomplete", () => {
    it("should render correctly", () => {
        render(() => <SeAutocomplete />);
        expect(screen.getByText("SeAutocomplete")).toBeInTheDocument();
    });
});
