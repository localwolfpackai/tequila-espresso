import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("shows error state styling", () => {
    render(<Input state="error" aria-label="email" />);
    expect(screen.getByLabelText("email").className).toContain("border-destructive");
  });

  it("handles onChange events", async () => {
    const onChange = vi.fn();
    render(<Input aria-label="change" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("change"), "amber");
    expect(onChange).toHaveBeenCalled();
  });

  it("supports controlled value", () => {
    render(<Input aria-label="controlled" value="fixed" onChange={() => undefined} />);
    expect(screen.getByLabelText("controlled")).toHaveValue("fixed");
  });
});
