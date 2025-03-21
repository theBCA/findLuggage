import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Function to generate a random 6-digit OTP
export const generateOTP = () => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

// Function to send verification email
export const sendVerificationEmail = async (email, name, otp) => {
  try {
    // Always log the OTP to console for testing/development
    console.log(`=================================================`);
    console.log(`📧 VERIFICATION OTP FOR ${email}: ${otp}`);
    console.log(`=================================================`);
    
    // In development mode, just return true after logging the OTP
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    // Email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification - Lost Luggage App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">Lost Luggage Email Verification</h2>
          <p>Hello ${name},</p>
          <p>Thank you for registering with Lost Luggage. To complete your registration, please use the following OTP code:</p>
          <div style="background-color: #f0f9ff; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 5px;">${otp}</div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <p>Best regards,<br>The Lost Luggage Team</p>
        </div>
      `,
    };

    try {
      // Try to send email
      await transporter.sendMail(mailOptions);
      console.log('Verification email sent successfully to:', email);
      return true;
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      return false;
    }
  } catch (error) {
    console.error('Error in sendVerificationEmail:', error);
    return false;
  }
};

export default {
  generateOTP,
  sendVerificationEmail,
}; 