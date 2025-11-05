import { Resend } from 'resend'

// Initialize Resend with API key
// Get your API key from: https://resend.com/api-keys
const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailVerificationProps {
  email: string
  verificationLink: string
}

export interface TeamInvitationEmailProps {
  inviteeName: string
  inviterName: string
  teamName: string
  role: string
  inviteLink: string
}

/**
 * Send email verification email
 */
export async function sendEmailVerification(
  to: string,
  props: EmailVerificationProps
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - skipping email send')
      return {
        success: false,
        error: 'Email service not configured',
      }
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'HP2 <noreply@yourdomain.com>',
      to: [to],
      subject: 'Verify your email address',
      html: generateVerificationEmailHTML(props),
    })

    if (error) {
      console.error('Failed to send verification email:', error)
      return {
        success: false,
        error: 'Failed to send email',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending verification email:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Send team invitation email
 */
export async function sendTeamInvitationEmail(
  to: string,
  props: TeamInvitationEmailProps
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - skipping email send')
      return {
        success: false,
        error: 'Email service not configured',
      }
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'HP2 <noreply@yourdomain.com>',
      to: [to],
      subject: `You've been invited to join ${props.teamName}`,
      html: generateInvitationEmailHTML(props),
    })

    if (error) {
      console.error('Failed to send invitation email:', error)
      return {
        success: false,
        error: 'Failed to send email',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending invitation email:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Generate HTML for invitation email
 */
function generateInvitationEmailHTML(props: TeamInvitationEmailProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Invitation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🏒 Team Invitation
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 16px; color: #111827; font-size: 16px; line-height: 24px;">
                Hi there,
              </p>
              <p style="margin: 0 0 24px; color: #111827; font-size: 16px; line-height: 24px;">
                <strong>${props.inviterName}</strong> has invited you to join <strong>${props.teamName}</strong> as a <strong>${props.role.replace('_', ' ')}</strong> on HP2 Hockey Practice Planner.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${props.inviteLink}" style="display: inline-block; padding: 16px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Accept Invitation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; line-height: 20px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin: 8px 0 0; color: #2563eb; font-size: 14px; line-height: 20px; word-break: break-all;">
                ${props.inviteLink}
              </p>

              <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 20px;">
                This invitation will expire in 7 days. If you didn't expect this invitation, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 18px;">
                HP2 Hockey Practice Planner<br>
                Track games • Generate AI practice plans • Manage teams
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Generate HTML for email verification email
 */
function generateVerificationEmailHTML(props: EmailVerificationProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🏒 Verify Your Email
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 16px; color: #111827; font-size: 16px; line-height: 24px;">
                Hi there,
              </p>
              <p style="margin: 0 0 24px; color: #111827; font-size: 16px; line-height: 24px;">
                Thanks for signing up for HP2 Hockey Practice Planner! Please verify your email address to unlock all features:
              </p>

              <ul style="margin: 0 0 24px; padding-left: 24px; color: #111827; font-size: 16px; line-height: 24px;">
                <li style="margin-bottom: 8px;">Create and manage teams</li>
                <li style="margin-bottom: 8px;">Track live games</li>
                <li style="margin-bottom: 8px;">Invite team members</li>
                <li style="margin-bottom: 8px;">Manage player rosters</li>
              </ul>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${props.verificationLink}" style="display: inline-block; padding: 16px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; line-height: 20px;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin: 8px 0 0; color: #2563eb; font-size: 14px; line-height: 20px; word-break: break-all;">
                ${props.verificationLink}
              </p>

              <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 20px;">
                This verification link will expire in 24 hours. If you didn't sign up for HP2, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 18px;">
                HP2 Hockey Practice Planner<br>
                Track games • Generate AI practice plans • Manage teams
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
