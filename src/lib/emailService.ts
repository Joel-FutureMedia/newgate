// Simple email service using Google SMTP via backend endpoint
import { api } from './api';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendContactEmail = async (data: ContactFormData): Promise<void> => {
  try {
    // Send email via backend API endpoint
    // The backend should use nodemailer with Google SMTP
    await api.post('/api/contact', {
      to: 'joelkalimbwe3@gmail.com',
      from: 'owellgraphics23@gmail.com',
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${data.phone}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; padding: 15px; background-color: #f3f4f6; border-radius: 4px; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        
        Message:
        ${data.message}
      `,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};

