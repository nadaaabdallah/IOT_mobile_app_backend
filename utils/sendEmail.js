/*const nodemailer = require('nodemailer');

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
};*/
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password', // App password if 2FA enabled
  },
});

transporter.sendMail({
  from: 'your_email@gmail.com',
  to: 'test_email@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email',
}).then(() => console.log('Email sent successfully'))
  .catch(err => console.error('Error sending email:', err));


module.exports = sendEmail;
