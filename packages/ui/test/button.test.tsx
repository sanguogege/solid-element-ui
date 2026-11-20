import { fireEvent, render, screen } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { describe, expect, it, vi } from "vite-plus/test";

import { Button } from "../core/button/button";

describe("Button", () => {
  it("renders a native button with type=button", () => {
    render(() => <Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });

    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("uses token classes so light and dark share one style", () => {
    render(() => <Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    const className = button.className;

    expect(className).toContain("bg-app");
    expect(className).toContain("text-main");
    expect(className).toContain("border-light");
    expect(className).toContain("focus-visible:ring-ring");
    expect(className).not.toMatch(/dark:(bg|text|border)-/);
  });

  it("lets consumer classes win over the default classes", () => {
    render(() => <Button class="bg-red-500">Override</Button>);

    expect(screen.getByRole("button", { name: "Override" }).className).toContain("bg-red-500");
  });

  it("is disabled when `disabled` is set", () => {
    render(() => <Button disabled>Disabled</Button>);

    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });

  it("is disabled and busy while loading, with a hidden status text", () => {
    render(() => (
      <Button loading loadingText="Saving changes">
        Save
      </Button>
    ));

    const button = screen.getByRole("button", { name: /Saving changes/ });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("data-loading");

    const spinner = button.querySelector("svg");
    expect(spinner).not.toBeNull();
    expect(spinner).toHaveAttribute("aria-hidden", "true");
  });

  it("reacts to loading changes", async () => {
    const [loading, setLoading] = createSignal(false);
    render(() => <Button loading={loading()}>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).not.toBeDisabled();

    setLoading(true);
    await Promise.resolve();

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("does not fire onClick while loading", () => {
    const onClick = vi.fn();
    render(() => (
      <Button loading onClick={onClick}>
        Save
      </Button>
    ));

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("fires onClick when enabled", () => {
    const onClick = vi.fn();
    render(() => <Button onClick={onClick}>Save</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders both icon slots as decorative wrappers", () => {
    render(() => (
      <Button
        leftIcon={<span data-testid="left-icon" />}
        rightIcon={<span data-testid="right-icon" />}
      >
        Continue
      </Button>
    ));

    const left = screen.getByTestId("left-icon").parentElement;
    const right = screen.getByTestId("right-icon").parentElement;

    expect(left).toHaveAttribute("data-icon", "inline-start");
    expect(right).toHaveAttribute("data-icon", "inline-end");
    expect(left).toHaveAttribute("aria-hidden", "true");
    expect(right).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps Kobalte polymorphism when rendered as a link", () => {
    render(() => (
      <Button as="a" href="/docs">
        Documentation
      </Button>
    ));

    const link = screen.getByRole("link", { name: "Documentation" });

    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/docs");
  });

  it("prevents activation of a polymorphic link while disabled", () => {
    const onClick = vi.fn();
    render(() => (
      <Button as="a" href="/docs" disabled onClick={onClick}>
        Documentation
      </Button>
    ));

    const link = screen.getByRole("link", { name: "Documentation" });
    const activated = fireEvent.click(link);

    expect(activated).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
  });
});
