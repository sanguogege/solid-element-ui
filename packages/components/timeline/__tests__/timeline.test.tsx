import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeTimeline } from "../src/timeline";

describe("SeTimeline", () => {
    it("should render correctly", () => {
        render(() => <SeTimeline>SeTimeline</SeTimeline>);
        expect(screen.getByText("SeTimeline")).toBeInTheDocument();
    });
});
