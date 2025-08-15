# 📧 Email Configuration Guide

This portfolio uses **Nodemailer** for server-side email sending. Follow this guide to configure email functionality.

## 🚀 Quick Setup

### 1. Configure Environment Variables

Update `.env.local` with your SMTP settings:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
TO_EMAIL=your_recipient@gmail.com
```

### 2. Provider-Specific Setup

#### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the 16-character app password as `SMTP_PASS`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
```

#### Outlook/Hotmail Setup
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
```

#### SendGrid Setup
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

## 🧪 Testing Email Configuration

Run the test script to verify your setup:

```bash
node scripts/test-email.js
```

Expected output:
```
Testing email configuration...

🔍 Testing SMTP connection...
✅ SMTP connection successful!
📧 Sending test email...
✅ Test email sent successfully!
📋 Message ID: <message-id>
```

## 🔧 Features

- ✅ **Server-side sending** (secure, no client-side exposure)
- ✅ **Multiple SMTP providers** (Gmail, Outlook, SendGrid, etc.)
- ✅ **Connection verification** before sending
- ✅ **HTML & text email** support
- ✅ **Form validation** with Zod
- ✅ **Error handling** with specific messages
- ✅ **Reply-to** functionality

## 🛠️ Development

### Contact Form Location
- **Component**: `components/contact.tsx`
- **Server Action**: `actions/sendEmail.ts`
- **Schema**: `lib/schemas.ts`

### Email Template
The email includes:
- Contact details (name, email, subject)
- Message content
- Professional HTML formatting
- Reply-to header for easy responses

## 🚨 Troubleshooting

### Common Issues

**"Invalid email credentials"**
- Check SMTP_USER and SMTP_PASS
- For Gmail, ensure you're using an App Password

**"SMTP server connection failed"**
- Verify SMTP_HOST and SMTP_PORT
- Check firewall/network restrictions

**"Authentication failed"**
- Confirm credentials are correct
- Enable "Less secure app access" if required

### Debug Steps
1. Run the test script: `node scripts/test-email.js`
2. Check server logs for detailed error messages
3. Verify environment variables are loaded correctly

## 🔒 Security Notes

- Never commit real credentials to version control
- Use environment variables for all sensitive data
- Consider using dedicated email services for production
- Keep SMTP credentials secure and rotate regularly

## 📞 Production Deployment

For production, consider:
- **SendGrid** - Reliable transactional emails
- **Mailgun** - Developer-friendly API
- **AWS SES** - Cost-effective at scale
- **Postmark** - High deliverability

Update the SMTP configuration accordingly for your chosen provider.