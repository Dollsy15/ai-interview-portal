const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    // Create transporter with your email credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "dollsyrani155@gmail.com", // your email
        pass: "Dollsyrani@8383", // your Gmail password (only for testing)
      },
    });

    // Email options
    const mailOptions = {
      from: `"AI Interview Portal" <dollsyrani155@gmail.com>`,
      to,
      subject,
      text,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", to);
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
