import express from "express";
import nodemailer from "nodemailer";


const router = express.Router();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Route
router.get("/send", async (req, res) => {
  try {
    const { subject, text } = req.query;

    if (!subject || !text) {
      return res.status(400).send({ message: "Subject and text are required" });
    }

    const info = await transporter.sendMail({
      from: `"2Min Site" <${process.env.GMAIL_USER}>`,
      to: "sabihop56@gmail.com", // ✅ fixed email
      subject: subject as string,
      text: text as string,
    }); 

    res.status(200).send({
      message: "Email sent successfully",
      info,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to send email" });
  }
});

export default router;