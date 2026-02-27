# Sanity Setup Guide

## Quick Start

### 1. Configure Environment Variables

Copy the example file and fill in your tokens:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (see below for how to get each token).

### 2. Get Your Sanity Token

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to **API** → **Tokens**
4. Click **Add API Token**
5. Name it "Vercel Production" 
6. Give it **Editor** permissions
7. Copy the token
8. Add to `.env.local`:
   ```
   SANITY_TOKEN=your_token_here
   ```

### 3. Configure CORS Origins

1. In Sanity project settings, go to **API** → **CORS Origins**
2. Add these origins:
   - `http://localhost:5173` (Vite dev server)
   - `http://localhost:3000` (Alternate dev port)
   - `https://www.bigthicketlawn.com` (Production)

### 4. Deploy the Studio

```bash
cd studio
npm install
npm run deploy
```

This will deploy your Studio to: `https://hj2wzg7f.sanity.studio/`

### 5. Test the Integration

Start your dev server:
```bash
npm run dev
```

Add some test content in Sanity Studio:
1. Go to https://hj2wzg7f.sanity.studio/
2. Create a Site Settings document
3. Add a Testimonial
4. Add a Photo Gallery

The new components will pull this data automatically.

---

## Facebook Integration Setup (Optional)

### 1. Create Facebook App

1. Go to https://developers.facebook.com/
2. Create new app (type: "Business")
3. Add "Facebook Login" and "Pages API" products

### 2. Get Page Access Token

```bash
# Get User Access Token from Graph API Explorer
curl -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_USER_TOKEN"

# Find your page in the response and copy the access_token field
```

Or use the Graph API Explorer:
1. Go to https://developers.facebook.com/tools/explorer/
2. Select your app
3. Get User Token with `pages_read_engagement` permission
4. Exchange for Page Token

### 3. Add Environment Variables

```
FACEBOOK_PAGE_ID=your_numeric_page_id
FACEBOOK_PAGE_ACCESS_TOKEN=your_long_lived_token
```

### 4. Test the Sync

Deploy to Vercel or run locally:
```bash
# Test locally
node -e "require('./api/sync-facebook')({method:'GET'}, {json: console.log, status: () => ({json: console.log})})"
```

Or visit after deploying:
```
https://www.bigthicketlawn.com/api/sync-facebook
```

---

## Production Deployment Checklist

- [ ] Add all environment variables to Vercel dashboard
- [ ] Deploy Sanity Studio (`cd studio && npm run deploy`)
- [ ] Configure CORS origins in Sanity
- [ ] Test content creation in Studio
- [ ] Verify React components display content
- [ ] (Optional) Test Facebook sync
- [ ] (Optional) Set up Vercel Cron secret for added security

---

## Common Issues

### "Token not configured" error
- Make sure `SANITY_TOKEN` is set in Vercel environment variables
- Token needs **Editor** role, not just **Viewer**

### Images not loading from SmugMug
- Verify URLs are direct image links (not album/gallery pages)
- Try adding `!Large` or `!X2` to the end of SmugMug URLs for sizing
- Check that images are public (not password protected)

### CORS errors
- Add your exact origin to Sanity CORS settings (include port for local dev)
- Protocol matters: `http` vs `https`

### Facebook token expired
- Page tokens last about 60 days
- You'll need to regenerate and update the environment variable
- Consider using a System User token for permanent access

---

## Next Steps

1. **Train your parents** on using Sanity Studio (15 min tutorial)
2. **Upload photos** to SmugMug and link in Sanity
3. **Migrate existing content** from static files to Sanity
4. **Build additional sections** using the new hooks
5. **Customize the Studio** if needed (add preview panes, etc.)

---

## Need Help?

- Sanity Docs: https://www.sanity.io/docs
- React Client: https://www.sanity.io/docs/js-client
- GROQ Queries: https://www.sanity.io/docs/groq
- Facebook Graph API: https://developers.facebook.com/docs/graph-api
