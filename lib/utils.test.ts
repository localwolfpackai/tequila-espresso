import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges classes correctly", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("handles undefined/null values", () => {
    expect(cn("px-2", undefined, null, false && "py-1")).toBe("px-2");
  });

  it("resolves Tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("works with CVA variants", () => {
    const variants = cva("inline-flex", {
      variants: {
        intent: { primary: "bg-primary", ghost: "bg-transparent" },
      },
      defaultVariants: { intent: "primary" },
    });

    expect(cn(variants({ intent: "ghost" }), "px-3")).toContain("bg-transparent");
  });
});
