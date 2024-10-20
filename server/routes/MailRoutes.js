import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Transporter setup (replace with actual credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'venkatsudarshan29@gmail.com',
    pass: 'your App Password', // Replace this with actual credentials
  },
});

// Route for sending ticket info via email (without PDF attachment)
router.post('/send-ticket', async (req, res) => {
  const { email, subject, ticketDetails } = req.body; // Adjusted to receive only ticket info

  try {
    const mailOptions = {
      from: 'venkatsudarshan29@gmail.com',
      to: email,
      subject: subject,
      text: ticketDetails, // Pass the ticket details as plain text
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending email' });
  }
});

export default router;
