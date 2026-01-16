const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendOtpEmail = async (to, otp) => {
  const msg = {
    to,
    from: 'yogitham2004@gmail.com', // MUST MATCH verified sender
    subject: 'Password Reset OTP',
    html: `
      <h3>Password Reset OTP</h3>
      <p>Your OTP is: <b>${otp}</b></p>
      <p>Valid for 10 minutes.</p>
    `,
  };

  await sgMail.send(msg);
};
