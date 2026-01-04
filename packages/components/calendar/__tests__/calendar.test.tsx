import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeCalendar } from "../src/calendar";

describe("SeCalendar", () => {
    it("should render correctly", () => {
        render(() => <SeCalendar>SeCalendar</SeCalendar>);
        expect(screen.getByText("SeCalendar")).toBeInTheDocument();
    });
});
