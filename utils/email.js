const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendOtpEmail = async (to, otp) => {
  await resend.emails.send({
    from: 'TaskFlow <onboarding@resend.dev>', // default verified sender
    to: [to],
    subject: '🔐 TaskFlow Password Reset OTP',
    html: `
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
            padding:24px;
            text-align:center;
            border-bottom:1px solid #232632;
        ">
            <h1 style="
            margin:0;
            font-size:22px;
            font-weight:600;
            color:#FFFFFF;
            ">
            TaskFlow
            </h1>
            <p style="
            margin-top:6px;
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
            <b style="font-weight:600;">TaskFlow</b> account password.
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
                color:rgb(104,141,241);
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
            <b style="color:#FFFFFF;">20 minutes</b>.
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
};
