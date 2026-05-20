import { Resend } from "resend";
import { config } from "./index.js";

const resend = new Resend(config.RESEND_API_KEY);

const sendMail = async ({ email, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: config.EMAIL_FROM, 
      to: email,
      subject,
      html,
    });

    return response;
  } catch (error) {
    console.error("Resend Email Error:", error);
    throw error;
  }
};

export { sendMail };
