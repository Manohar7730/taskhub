import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (recipient, subject, text, html = null) => {
  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;

    if (!apiKey || !senderEmail) {
      console.error("Brevo environment variables are missing.");
      return false;
    }

    const body = {
      sender: { name: "TaskHub", email: senderEmail },
      to: [{ email: recipient }],
      subject,
      textContent: text,
      htmlContent: html || `<p>${text}</p>`
    };

    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "content-type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Brevo failed:", err);
        return false;  
      }

      console.log(`Brevo: Email sent to ${recipient}`);
      return true;

    } catch (err) {
      console.error("Brevo request error:", err);
      return false;
    }
  }
  const gmailUser = process.env.EMAIL_USER;
  const gmailPass = process.env.EMAIL_PASS;

  if (!gmailUser || !gmailPass) {
    console.error("Gmail environment variables are missing.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailPass }
  });

  try {
    await transporter.sendMail({
      from: `"TaskHub" <${gmailUser}>`,
      to: recipient,
      subject,
      text,
      html
    });

    console.log(`Gmail: Email sent to ${recipient}`);
    return true;

  } catch (err) {
    console.error("Gmail send error:", err);
    return false;
  }
};
