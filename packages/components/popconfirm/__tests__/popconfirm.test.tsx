import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SePopconfirm } from "../src/popconfirm";

describe("SePopconfirm", () => {
    it("should render correctly", () => {
        render(() => <SePopconfirm>SePopconfirm</SePopconfirm>);
        expect(screen.getByText("SePopconfirm")).toBeInTheDocument();
    });
});
