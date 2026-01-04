import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { SeSteps } from "../src/steps";

describe("SeSteps", () => {
    it("should render correctly", () => {
        render(() => <SeSteps>SeSteps</SeSteps>);
        expect(screen.getByText("SeSteps")).toBeInTheDocument();
    });
});
