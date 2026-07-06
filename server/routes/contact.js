import express from "express";
import nodemailer from "nodemailer";
import Contact from "../models/Contact.js"; // ✅ MISSING IMPORT FIXED

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // =========================
    // 1. SAVE IN MONGODB
    // =========================
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // =========================
    // 2. SEND EMAIL
    // =========================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Message - Hamro Pasal",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message saved & sent successfully",
      contact,
    });

  } catch (error) {
    console.log("CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process contact request",
    });
  }
});

export default router;