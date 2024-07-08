
const nodemailer = require('nodemailer');

const prisma = require("../models");
const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const contactController = {
  sendMessage: async (req, res) => {
    const { name, email, message } = req.body;

    try {
      // Check if a contact with the given email already exists
      const existingContact = await prisma.contact.findUnique({
        where: {
          email: email, 
        },
      });

      if (existingContact) {
        return res.status(400).json({ error: 'Email address already exists' });
      }

      // Save to MySQL database using Prisma
      const savedMessage = await prisma.contact.create({
        data: {
          name,
          email,
          message,
        },
      });

      // Send email using Nodemailer
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting us!',
        text: `Dear ${name},\n\nThank you for your message. We will get back to you shortly.\n\nBest regards,\nYour Company Name`,
      });

      res.status(200).json({ message: 'Email sent and message saved successfully' });
    } catch (error) {
      console.error('Error:', error);

      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Email address already exists' });
      } else if (error.responseCode === 535) {
        res.status(500).json({ error: 'Email service authentication failed' });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  },
};

module.exports = contactController;