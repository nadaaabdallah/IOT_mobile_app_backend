const nodemailer = require('nodemailer');

// Send email using Nodemailer
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use an email service like Gmail
    auth: {
      user: process.env.EMAIL_USERNAME,  // Sender email (set via environment variables for security)
      pass: process.env.EMAIL_PASSWORD,  // Email app password or regular password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,  // Sender's email address
    to,  // Recipient's email address
    subject,  // Subject line
    text,  // Email body text
  };

  try {
    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error while sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
