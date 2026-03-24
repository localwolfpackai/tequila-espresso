import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders all variants", () => {
    const variants = ["default", "secondary", "outline", "ghost", "destructive", "success", "link"] as const;
    variants.forEach((variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole("button", { name: variant })).toBeInTheDocument();
    });
  });

  it("renders all sizes", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    sizes.forEach((size) => {
      render(<Button size={size}>{size}</Button>);
      expect(screen.getByRole("button", { name: size })).toBeInTheDocument();
    });
  });

  it("shows loading state with spinner", () => {
    render(<Button loading loadingText="Saving">Save</Button>);
    expect(screen.getByRole("button", { name: /Saving/i })).toHaveAttribute("aria-busy", "true");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("handles disabled state", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Disabled/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as child when asChild=true", () => {
    render(
      <Button asChild>
        <Link href="/docs">Docs</Link>
      </Button>,
    );
    expect(screen.getByRole("link", { name: /Docs/i })).toBeInTheDocument();
  });
});
