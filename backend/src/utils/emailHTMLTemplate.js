import { config } from "../config/index.js";

// email otp template
export const getOtpHtml = ({ email, otp }) => {
  const appName = config.APP_NAME;
  const year = new Date().getFullYear();

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${appName} | Verification Code</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
      <tr>
        <td align="center">

          <!-- Card -->
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:#111827;padding:24px;">
                <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">
                  ${appName}
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 32px;">
                <h2 style="margin-top:0;font-size:22px;font-weight:700;color:#111;">Verify your email</h2>
                <p style="font-size:15px;line-height:1.6;color:#444;margin:16px 0;">
                  Hi <strong>${email}</strong>,<br>
                  Use the verification code below to complete your sign-in to <strong>${appName}</strong>.
                </p>

                <!-- OTP Code Box -->
                <div style="text-align:center;margin:28px 0;">
                  <div style="
                    display:inline-block;
                    background:#f3f4f6;
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    padding:18px 24px;
                    font-size:32px;
                    letter-spacing:10px;
                    font-weight:700;
                    color:#111;
                    font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                    ${otp}
                  </div>
                </div>

                <p style="font-size:14px;color:#555;line-height:1.6;margin-bottom:8px;text-align:center;">
                  This code will expire in <strong>5 minutes</strong>.
                </p>
                <p style="font-size:13px;color:#777;line-height:1.6;margin-top:24px;text-align:center;">
                  If this wasn’t initiated by you, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f9fafb;padding:16px 24px;">
                <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.6;">
                  © ${year} ${appName}. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
          <!-- End Card -->

        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

// verify token email template
export const getVerifyEmailHtml = ({ email, token }) => {
  const appName = config.APP_NAME
  const baseUrl = config.CLIENT_URL
  const verifyUrl = `${baseUrl}/verify-email?token=${encodeURIComponent(token
  )}`;

  const year = new Date().getFullYear();

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${appName} | Verify Your Account</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111;">

    <!-- Wrapper -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
      <tr>
        <td align="center">
          <!-- Main Card -->
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:#111827;padding:24px;">
                <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">${appName}</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 32px;">
                <h2 style="margin-top:0;font-size:22px;font-weight:700;color:#111;">Verify your account</h2>
                <p style="font-size:15px;line-height:1.6;color:#444;margin:16px 0;">
                  Hi <strong>${email}</strong>,<br>
                  Thanks for signing up with <strong>${appName}</strong>! Please verify your email to activate your account.
                </p>

                <!-- CTA Button -->
                <div style="text-align:center;margin:32px 0;">
                  <a href="${verifyUrl}" target="_blank" rel="noopener"
                    style="background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:15px;display:inline-block;">
                    Verify Email
                  </a>
                </div>

                <!-- Fallback link -->
                <p style="font-size:14px;color:#555;line-height:1.6;margin-bottom:8px;">
                  Or copy and paste this link into your browser:
                </p>
                <p style="font-size:14px;color:#2563eb;word-break:break-all;margin:0;">
                  <a href="${verifyUrl}" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:underline;">
                    ${verifyUrl}
                  </a>
                </p>

                <p style="font-size:13px;color:#777;line-height:1.6;margin-top:24px;">
                  If you didn’t request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f9fafb;padding:16px 24px;">
                <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.6;">
                  © ${year} ${appName}. All rights reserved.<br>
                  <a href="${baseUrl}" target="_blank" style="color:#6b7280;text-decoration:none;">Visit Website</a>
                </p>
              </td>
            </tr>
          </table>
          <!-- End Main Card -->
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
