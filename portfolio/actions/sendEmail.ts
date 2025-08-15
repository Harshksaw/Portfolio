"use server";

import { TFormSchema, FormSchema } from "@/lib/schemas";
import nodemailer from "nodemailer";

export async function sendEmail(values: TFormSchema) {
  // Validate the input data
  const validatedFields = FormSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data" };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    // Validate required environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Missing required SMTP environment variables');
      return { success: false, error: "Email service not configured" };
    }

    // Create transporter with flexible SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Additional security options
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // Test the connection
    await transporter.verify();

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || "canadaharsh2002@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      text: `From: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4F46E5; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px; font-size: 12px; color: #666;">
            <p style="margin: 0;">This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error("Nodemailer error:", error);
    
    // Provide more specific error messages
    let errorMessage = "Failed to send email";
    
    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        errorMessage = "Invalid email credentials";
      } else if (error.message.includes("connect ECONNREFUSED")) {
        errorMessage = "SMTP server connection failed";
      } else if (error.message.includes("Authentication failed")) {
        errorMessage = "Email authentication failed";
      } else {
        errorMessage = error.message;
      }
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
}
