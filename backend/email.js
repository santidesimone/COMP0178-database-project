// emailService.js
const nodemailer = require('nodemailer');

// Create a transporter object using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your email provider's SMTP server
  port: 587, // Common port for SMTP
  secure: false, // Set to true if using port 465
  auth: {
    user: 'your-email@example.com', // Your email
    pass: 'your-email-password' // Your email password or app-specific password
  }
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Your Name" <your-email@example.com>', // Sender address
      to, // List of recipients
      subject, // Subject line
      text, // Plain text body
      // html: '<b>Hello world?</b>' // Uncomment this to send HTML emails
    });

    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendEmail
};
