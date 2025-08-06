# Email Service Setup Guide

This project uses **Resend** for sending quote request emails via a serverless function. Here's how to set it up:

## 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (3,000 emails/month)
3. Verify your email address

## 2. Add Your Domain

1. In the Resend dashboard, go to **Domains**
2. Add your domain: `bigthicketlawn.com`
3. Add the required DNS records to your domain provider:
   - **MX Record**: `10 feedback-smtp.us-east-1.amazonses.com`
   - **TXT Record**: `"v=spf1 include:amazonses.com ~all"`
   - **CNAME Record**: `_domainkey.bigthicketlawn.com` → (provided by Resend)

## 3. Get Your API Key

1. In the Resend dashboard, go to **API Keys**
2. Create a new API key with **Send** permissions
3. Copy the API key (starts with `re_`)

## 4. Set Environment Variables

### For Local Development:
Create a `.env.local` file in your project root:
```env
RESEND_API_KEY=re_your_actual_api_key_here
```

### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_api_key_here`
   - **Environment**: Production, Preview, Development

## 5. Update Email Addresses

In `/api/send-quote.js`, update the email addresses:

```javascript
// Line 84: Update the 'from' address to use your verified domain
from: 'quotes@bigthicketlawn.com', // Must match your verified domain

// Line 85: Update the recipient email
to: ['estimate@bigthicketlawn.com'], // Your business email
```

## 6. Test the Setup

1. Deploy to Vercel or run locally
2. Submit a test quote through the form
3. Check that the email arrives at `estimate@bigthicketlawn.com`
4. Verify the email formatting and content

## Email Features

✅ **Professional HTML formatting** with styled sections
✅ **Plain text fallback** for email clients that don't support HTML
✅ **Customer reply-to** - replies go directly to the customer
✅ **Geocoded address** information included
✅ **Multi-select services** formatted as a bulleted list
✅ **Timezone-aware timestamps** (Central Time)
✅ **Error handling** with user-friendly messages

## Troubleshooting

### Common Issues:

1. **"Failed to send email"**
   - Check that your API key is correct
   - Verify the domain is properly configured
   - Check Vercel function logs

2. **Emails not arriving**
   - Check spam/junk folders
   - Verify DNS records are properly set
   - Ensure the 'from' address uses your verified domain

3. **Domain verification issues**
   - DNS changes can take up to 48 hours to propagate
   - Use DNS checker tools to verify records

### Alternative Email Services:

If you prefer a different service, you can easily modify `/api/send-quote.js` to use:
- **SendGrid** (free tier: 100 emails/day)
- **Mailgun** (free tier: 5,000 emails/month)
- **EmailJS** (client-side, 200 emails/month)

## Cost

- **Resend Free Tier**: 3,000 emails/month
- **Vercel Serverless**: 100GB-hours/month free
- **Total Monthly Cost**: $0 for most small businesses

The serverless function is very lightweight and should stay well within Vercel's free limits.
