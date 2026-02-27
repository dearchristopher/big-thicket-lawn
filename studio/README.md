# Big Thicket Lawn - Sanity Studio

This is the Sanity Studio for managing content on the Big Thicket Lawn Services website.

## Accessing the Studio

### Option 1: Sanity Cloud (Hosted)
The studio is deployed at: `https://hj2wzg7f.sanity.studio/`

### Option 2: Local Development
```bash
cd studio
npm install
npm run dev
```

Then open: `http://localhost:3333`

## Content Types

### 1. Testimonials
Customer reviews and ratings. Mark as "Featured" to show on homepage.

**Fields:**
- Customer Name
- Quote/Review text
- Rating (1-5 stars)
- Photo URL (from SmugMug)
- Service Type
- Featured toggle

### 2. Photo Galleries (Before/After)
Transformation projects showcasing your work.

**Fields:**
- Project Title
- Before Photo URL (SmugMug)
- After Photo URL (SmugMug)
- Description
- Service Category
- Featured toggle
- Completion Date

### 3. Services
Dynamic service listings. Update descriptions, pricing, and visibility anytime.

**Fields:**
- Service Name
- URL Slug (for linking)
- Short Description (for cards)
- Full Description (rich text)
- Pricing Text
- Icon
- Photo URL
- Display Order
- Active/Visible toggle

### 4. Facebook Imports
Staging area for content imported from Facebook. Review and approve posts to convert them to testimonials or galleries.

**Workflow:**
1. Facebook posts auto-import every 6 hours
2. Review in "Facebook Imports" section
3. Set status: "Approved as Testimonial", "Approved as Gallery", or "Rejected"
4. Approved items create new testimonials/galleries automatically

### 5. Site Settings
Global settings like phone number, business hours, hero text, and SEO defaults.

**Fields:**
- Phone Number
- Business Hours
- Service Area
- Hero Title/Subtitle/Image
- About Section Text
- Facebook Page URL/ID
- SEO Meta Title/Description

## SmugMug Integration

Since you're using SmugMug for image hosting:

1. Upload photos to your SmugMug account
2. Get the direct image URL (right-click → Copy Image Address)
3. Paste the URL in the appropriate field in Sanity

**Tip:** SmugMug URLs work best when they end in a size suffix like `!Large` or `!X2`

## Mobile Access

Download the **Sanity Studio** app from the App Store or Google Play:
- Log in with the same account
- Access all content on your phone
- Upload photos directly from your camera

## Need Help?

- Sanity Docs: https://www.sanity.io/docs
- GROQ Query Language: https://www.sanity.io/docs/groq
- Contact: Your developer (that's probably you reading this!)
