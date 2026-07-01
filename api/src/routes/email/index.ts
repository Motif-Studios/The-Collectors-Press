import { Router } from "express";

const router = Router();
const nodemailer = require("nodemailer");
const cors = require("cors");

require('dotenv').config();

// console.log("SMTP_EMAIL:", process.env.SMTP_EMAIL); 
// console.log("SMTP_PASSWORD:", process.env.SMTP_PASSWORD);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Secure SSL port
  secure: true, 
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});


/**
 * @openapi
 * /email/contact-us:
 *  post:
 *    tags: [Email]
 *    summary: Contact us email
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            message:
 *              type: string
 *            subject:
 *              type: string
 *  responses:
 *    200:
 *     description: Email response
*/
router.post("/contact-us", async (req, res) => {
    const { name, email, message, subject } = req.body;

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: process.env.SMTP_EMAIL,
        subject: subject || `Contact Us Message from ${name}`,  // use the user's subject
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };
    
    
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('SMTP Error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

/**
 * @openapi
 * /email/write-for-us:
 *  post:
 *    tags: [Email]
 *    summary: Write for us email
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            bio:
 *              type: string
 *            section:
 *              type: string
 *            pitchTitle:
 *              type: string
 *            pitch:
 *              type: string
 *            links:
 *              type: string
 *            experience:
 *              type: string
 *  responses:
 *    200:
 *     description: Email response
*/
router.post("/write-for-us", async (req, res) => {
    const { name, email, bio, section, pitchTitle, pitch, links, experience } = req.body;

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: process.env.SMTP_EMAIL,
        subject: `Write for Us Message from ${name}`,  // use the user's subject
        text: `Name: ${name}\nEmail: ${email}\n\nBio: ${bio}\nSection: ${section}\nPitch Title: ${pitchTitle}\nPitch: ${pitch}\nLinks: ${links}\nExperience: ${experience}`,
    };
    
    
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('SMTP Error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

export default router;