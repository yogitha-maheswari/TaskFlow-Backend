const SibApiV3Sdk = require('sib-api-v3-sdk');

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();

exports.sendOtpEmail = async (to, otp) => {
  await transactionalApi.sendTransacEmail({
    sender: {
      email: 'no-reply@brevo.com',
      name: 'TaskFlow',
    },
    to: [{ email: to }],
    subject: '🔐 TaskFlow Password Reset OTP',
    htmlContent: `
      <div style="background:#0B0C0F;padding:40px 16px;font-family:Segoe UI,Arial;">
        <div style="max-width:420px;margin:auto;background:#14161C;border-radius:16px;border:1px solid #232632;">
          <div style="padding:24px;text-align:center;border-bottom:1px solid #232632;">
            <h1 style="color:#fff;margin:0;">TaskFlow</h1>
            <p style="color:#9AA0AA;font-size:13px;">Secure Password Reset</p>
          </div>
          <div style="padding:24px;color:#fff;">
            <p>Hello 👋</p>
            <p>Your OTP:</p>
            <div style="background:#1B1E26;border-radius:12px;padding:16px;text-align:center;">
              <span style="font-size:26px;letter-spacing:6px;color:#689DF1;">
                ${otp}
              </span>
            </div>
            <p style="font-size:12px;color:#9AA0AA;">⏳ Valid for 20 minutes</p>
          </div>
        </div>
      </div>
    `,
  });
};