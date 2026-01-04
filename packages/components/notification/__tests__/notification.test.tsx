import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeNotification } from "../src/notification";

describe("SeNotification", () => {
    it("should render correctly", () => {
        render(() => <SeNotification>SeNotification</SeNotification>);
        expect(screen.getByText("SeNotification")).toBeInTheDocument();
    });
});
