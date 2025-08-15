import { z } from 'zod';

// Shared form validation schema that can be used on both client and server
export const FormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message too long")
});

// Type definition for form schema
export type TFormSchema = z.infer<typeof FormSchema>;