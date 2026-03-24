import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Combobox } from "@/components/ui/combobox";

const options = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
  { value: "tailwind", label: "Tailwind" },
];

describe("Combobox", () => {
  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} onChange={() => undefined} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("filters options on input", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} onChange={() => undefined} />);
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Search..."), "Tail");
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("selects option on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("React"));
    expect(onChange).toHaveBeenCalledWith("react");
  });

  it("selects option on Enter", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Search..."), "Next{enter}");
    expect(onChange).toHaveBeenCalledWith("next");
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} onChange={() => undefined} />);
    await user.click(screen.getByRole("combobox"));
    await user.keyboard("{Escape}");
    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
  });

  it("handles empty results", async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} onChange={() => undefined} />);
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Search..."), "zzz");
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
});
