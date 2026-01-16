const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendOtpEmail = async (to, otp) => {
  const msg = {
    to,
    from: 'yogitham2004@gmail.com', // MUST be verified in SendGrid
    subject: '🔐 TaskFlow Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: #111827; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">TaskFlow</h2>
          </div>

          <!-- Body -->
          <div style="padding: 25px; color: #111827;">
            <p style="font-size: 15px;">Hello 👋,</p>

            <p style="font-size: 15px;">
              We received a request to reset your <b>TaskFlow</b> account password.
            </p>

            <p style="font-size: 15px; margin-bottom: 10px;">
              Use the OTP below to continue:
            </p>

            <!-- OTP Box -->
            <div style="
              font-size: 28px;
              font-weight: bold;
              letter-spacing: 6px;
              text-align: center;
              padding: 15px;
              margin: 20px 0;
              background: #f1f5f9;
              border-radius: 8px;
              color: #111827;
            ">
              ${otp}
            </div>

            <p style="font-size: 14px; color: #475569;">
              ⏳ This OTP is valid for <b>10 minutes</b>.
            </p>

            <p style="font-size: 14px; color: #475569;">
              If you didn’t request a password reset, you can safely ignore this email.
            </p>

            <p style="font-size: 14px; margin-top: 30px;">
              — Team <b>TaskFlow</b>
            </p>
          </div>

          <!-- Footer -->
          <div style="
            background: #f8fafc;
            padding: 12px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
          ">
            © ${new Date().getFullYear()} TaskFlow. All rights reserved.
          </div>

        </div>
      </div>
    `,
  };

  await sgMail.send(msg);
};