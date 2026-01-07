require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendOtpEmail = async (to, otp) => {
    await transporter.sendMail({
        from: `"TaskFlow" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Password Reset OTP',
        html: `
          <h3>Password Reset OTP</h3>
          <p>Your OTP is: <b>${otp}</b></p>
          <p>Valid for 10 minutes.</p>
        `
    });
};
