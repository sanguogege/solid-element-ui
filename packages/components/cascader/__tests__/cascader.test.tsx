import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeCascader } from "../src/cascader";

describe("SeCascader", () => {
    it("should render correctly", () => {
        render(() => <SeCascader />);
        expect(screen.getByText("SeCascader")).toBeInTheDocument();
    });
});
