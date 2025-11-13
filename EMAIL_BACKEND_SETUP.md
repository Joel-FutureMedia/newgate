# Email Backend Setup Guide

To enable email sending functionality, you need to create a backend endpoint that uses Google SMTP.

## Backend Endpoint Setup

Create an endpoint at `/api/contact` in your backend that accepts POST requests with the following structure:

### Request Body:
```json
{
  "to": "joelkalimbwe3@gmail.com",
  "from": "owellgraphics23@gmail.com",
  "subject": "New Contact Form Submission from [Name]",
  "html": "<html content>",
  "text": "plain text content"
}
```

### Example Node.js/Express Endpoint:

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create transporter with Google SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'owellgraphics23@gmail.com',
    pass: 'WEEU WUER EWIE OEWU' // App password
  }
});

router.post('/api/contact', async (req, res) => {
  try {
    const { to, from, subject, html, text } = req.body;

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html,
      text: text
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

module.exports = router;
```

### Required Package:
```bash
npm install nodemailer
```

### CORS Configuration:
Make sure your backend allows CORS requests from your frontend domain.

### Security Note:
In production, store the email credentials in environment variables instead of hardcoding them.

