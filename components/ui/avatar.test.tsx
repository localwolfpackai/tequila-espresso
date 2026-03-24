import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

describe("Avatar", () => {
  it("renders fallback when no image is provided", () => {
    render(
      <Avatar aria-label="User avatar">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
    expect(screen.getByLabelText("User avatar")).toBeInTheDocument();
  });

  it("shows fallback while image is not loaded (Radix defers img until loaded)", () => {
    render(
      <Avatar>
        <AvatarImage src="/photo.png" alt="Ada Lovelace" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("AL")).toBeInTheDocument();
  });
});
