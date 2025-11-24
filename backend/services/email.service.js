import nodemailer from "nodemailer";

/**
 * Send an email using Gmail SMTP.
 *
 * @param {string} recipient - The email address to send to
 * @param {string} subject - Email subject line
 * @param {string} message - Plain text body of the email
 */
export const sendEmail = async (recipient, subject, message) => {
  try {
    // Ensure required env variables exist — prevents silent failures
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email configuration missing in environment variables.");
    }

    // Create a reusable SMTP transport connection
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"TaskHub" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject,
      text: message,
    });

    console.log(`[EMAIL] Sent to ${recipient}`);
  } catch (err) {
    console.error("[EMAIL ERROR]", err.message);
    throw err; // allow the controller to handle response
  }
};
