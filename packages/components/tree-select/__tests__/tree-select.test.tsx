import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeTreeSelect } from "../src/tree-select";

describe("SeTreeSelect", () => {
    it("should render correctly", () => {
        render(() => <SeTreeSelect>SeTreeSelect</SeTreeSelect>);
        expect(screen.getByText("SeTreeSelect")).toBeInTheDocument();
    });
});
