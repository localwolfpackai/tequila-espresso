import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Please provide more detail"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
