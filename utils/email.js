const SibApiV3Sdk = require('sib-api-v3-sdk');

// Configure Brevo API client
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();

exports.sendOtpEmail = async (to, otp) => {
  try {
    await transactionalApi.sendTransacEmail({
      sender: {
        name: 'TaskFlow',
        email: 'yogitham2004@gmail.com', // verified sender
      },
      to: [{ email: to }],
      subject: '🔐 TaskFlow Password Reset OTP',

      htmlContent: `
<div style="
  background-color:#0B0C0F;
  padding:40px 16px;
  font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;
">
  <div style="
    max-width:420px;
    margin:0 auto;
    background-color:#14161C;
    border-radius:16px;
    border:1px solid #232632;
    overflow:hidden;
  ">

    <!-- Header -->
    <div style="
      padding:28px 24px;
      text-align:center;
      border-bottom:1px solid #232632;
    ">
      <div style="padding:24px;">
        <img
            src="https://raw.githubusercontent.com/yogitha-maheswari/TaskFlow-Backend/main/assets/logo%20-%20email.png"
            alt="TaskFlow"
            style="
            display:block;
            width:100%;
            max-width:420px;
            height:auto;
            margin:0 auto;
            "
        />
      </div>


      <p style="
        margin:0;
        font-size:13px;
        color:#9AA0AA;
      ">
        Secure Password Reset
      </p>
    </div>

    <!-- Content -->
    <div style="padding:24px;">
      <p style="
        font-size:14px;
        color:#9AA0AA;
        margin:0 0 12px 0;
      ">
        Hello 👋
      </p>

      <p style="
        font-size:14px;
        color:#FFFFFF;
        margin:0 0 16px 0;
        line-height:1.5;
      ">
        We received a request to reset your
        <b>TaskFlow</b> account password.
      </p>

      <p style="
        font-size:13px;
        color:#6F7480;
        margin-bottom:12px;
      ">
        Use the OTP below to continue:
      </p>

      <!-- OTP Box -->
      <div style="
        background-color:#1B1E26;
        border:1px solid #232632;
        border-radius:12px;
        padding:14px;
        text-align:center;
        margin:16px 0 20px 0;
      ">
        <span style="
          font-size:26px;
          font-weight:600;
          letter-spacing:6px;
          color:#689DF1;
        ">
          ${otp}
        </span>
      </div>

      <p style="
        font-size:12px;
        color:#9AA0AA;
        margin-bottom:8px;
      ">
        ⏳ This OTP is valid for
        <b style="color:#FFFFFF;">10 minutes</b>.
      </p>

      <p style="
        font-size:12px;
        color:#6F7480;
        margin-bottom:24px;
        line-height:1.5;
      ">
        If you didn’t request a password reset,
        you can safely ignore this email.
      </p>

      <p style="
        font-size:13px;
        color:#FFFFFF;
        margin:0;
      ">
        — Team <b>TaskFlow</b>
      </p>
    </div>

    <!-- Footer -->
    <div style="
      background-color:#161922;
      border-top:1px solid #232632;
      padding:12px;
      text-align:center;
    ">
      <p style="
        margin:0;
        font-size:11px;
        color:#6F7480;
      ">
        © ${new Date().getFullYear()} TaskFlow. All rights reserved.
      </p>
    </div>

  </div>
</div>
      `,
    });

    console.log('✅ OTP email sent to', to);
  } catch (err) {
    console.error('❌ Brevo email error:', err.response?.body || err);
    throw err;
  }
};
