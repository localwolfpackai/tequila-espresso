import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAmberForm, Form } from "@/components/ui/form";
import { contactSchema } from "@/lib/validators/contact-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function DemoForm({ onSubmit }: { onSubmit: (values: unknown) => void }) {
  const form = useAmberForm({
    schema: contactSchema,
    defaultValues: { name: "", email: "", message: "" },
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Input aria-label="name" {...form.register("name")} />
      <Input aria-label="email" {...form.register("email")} />
      <Input aria-label="message" {...form.register("message")} />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

describe("form-submission", () => {
  it("validates and submits", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<DemoForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText("name"), "Amber");
    await user.type(screen.getByLabelText("email"), "team@amberui.dev");
    await user.type(screen.getByLabelText("message"), "This is a valid message.");
    await user.click(screen.getByRole("button", { name: /Submit/i }));
    expect(onSubmit).toHaveBeenCalled();
  });
});
