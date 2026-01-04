import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeStatistic } from "../src/statistic";

describe("SeStatistic", () => {
    it("should render correctly", () => {
        render(() => <SeStatistic>SeStatistic</SeStatistic>);
        expect(screen.getByText("SeStatistic")).toBeInTheDocument();
    });
});
