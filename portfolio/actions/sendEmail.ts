"use server";

import { TFormSchema, FormSchema } from "@/components/contact";
import { Resend } from "resend";

export async function sendEmail(values: TFormSchema) {
  // Validate the input data
  const validatedFields = FormSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data" };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    const resend = new Resend("re_L8AunFxe_AW5vS1eBxxpu3E22H1NrPouQ");
    const { data, error } = await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`,
      to: [canadaharsh2002@gmail.com"],
      subject: `Portfolio Contact: ${subject}`,
      text: `Email: ${email}\nName: ${name}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });
    
    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send email" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Send email error:", error);
    return { success: false, error: "Server error" };
  }
}
