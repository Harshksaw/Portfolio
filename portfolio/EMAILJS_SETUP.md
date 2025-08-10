# EmailJS Contact Form Setup Instructions

## 📧 EmailJS Configuration

To make the contact form functional, you need to configure EmailJS with your email service:

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Copy the **Service ID**

### 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:
   ```
   Subject: New Contact Form Message - {{subject}}
   
   From: {{from_name}} ({{from_email}})
   Subject: {{subject}}
   
   Message:
   {{message}}
   
   ---
   Sent from your portfolio contact form
   ```
4. Copy the **Template ID**

### 4. Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

### 5. Update the Code
In `app/experience/page.tsx`, replace these placeholders around line 412-414:

```typescript
// Replace these with your EmailJS configuration
const serviceId = 'YOUR_SERVICE_ID';        // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID';      // Replace with your Template ID  
const publicKey = 'YOUR_PUBLIC_KEY';        // Replace with your Public Key
```

### 6. Template Variables
Make sure your EmailJS template includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Message content
- `{{to_email}}` - Your email (optional, can be hardcoded in template)

## 🎨 Features Included

✅ **Responsive Design** - Works on all device sizes  
✅ **Form Validation** - Required fields with proper validation  
✅ **Loading States** - Loading spinner during submission  
✅ **Success/Error Messages** - Clear feedback to users  
✅ **Modern UI** - Matches your portfolio's design  
✅ **Multiple Contact Methods** - Form + Email + Telegram + LinkedIn  
✅ **Accessibility** - Proper labels and focus states  

## 🚀 Testing

After configuring EmailJS:
1. Fill out the contact form
2. Submit a test message
3. Check your email for the received message
4. Verify the success message appears

## 🔧 Customization

You can customize:
- Email template design in EmailJS dashboard
- Form fields in the React component
- Styling and colors to match your brand
- Add more contact methods or social links

## ❗ Important Notes

- Keep your EmailJS keys secure
- Test thoroughly before going live
- Monitor your EmailJS quota (free tier has limits)
- Consider adding spam protection for production use

The contact form is now integrated below your experience section and ready to use! 🎉