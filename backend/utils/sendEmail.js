import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  try {
    console.log("📡 EMAIL FUNCTION CALLED");

    console.log("USER:", process.env.EMAIL_USER);
    console.log("PASS EXISTS:", !!process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📨 Transporter created");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
    });

    console.log("✅ EMAIL SENT:", info.response);

    return info;

  } catch (error) {
    console.log("❌ EMAIL ERROR FULL:", error);
  }
};