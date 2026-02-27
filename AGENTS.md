# Big Thicket Lawn Services - Agent Documentation

## Project Overview

Big Thicket Lawn Services is a **React + TypeScript + Vite** single-page application (SPA) for a family-owned lawn care business based in Lumberton, TX. The website serves as a marketing and lead generation platform, featuring service information, company details, and an integrated quote request system.

**Live Site**: https://www.bigthicketlawn.com

## Technology Stack

### Frontend
- **Framework**: React 19.1.0 with TypeScript 5.8.3
- **Build Tool**: Vite 5.4.10
- **Routing**: React Router DOM 7.7.1
- **Styling**: Tailwind CSS 4.1.11 with custom configuration
- **Forms**: React Hook Form 7.62.0
- **UI Components**: 
  - Lucide React (icons)
  - React Select 5.10.2 (dropdowns with multi-select)
- **Maps**: Leaflet 1.9.4 + React Leaflet 5.0.0
- **Utilities**: Lodash 4.17.21 (debouncing)

### Backend/Serverless
- **Platform**: Vercel Serverless Functions
- **Email Service**: Resend API (free tier: 3,000 emails/month)
- **Function Location**: `/api/send-quote.js`

### Analytics & Monitoring
- **Microsoft Clarity**: User behavior analytics (project ID: `ssxc6ul0zu`)
- **Vercel Analytics**: Web vitals and performance
- **Vercel Speed Insights**: Performance monitoring

### Deployment
- **Hosting**: Vercel
- **Domain**: bigthicketlawn.com

## Project Structure

```
big-thicket-lawn/
├── api/                      # Vercel serverless functions
│   └── send-quote.js         # Email sending endpoint
├── public/                   # Static assets
│   └── images/               # Photos and graphics
├── src/
│   ├── assets/               # SVG assets and icons
│   │   └── svg/              # SVG files
│   ├── components/           # Reusable React components
│   │   ├── icons/            # Custom SVG icon components
│   │   ├── BigThicketLogo.tsx
│   │   ├── EstimateModal.tsx # YardBook iframe modal
│   │   ├── Footer.tsx
│   │   ├── Header.tsx        # Sticky navigation header
│   │   ├── HeaderMower.tsx   # Logo component
│   │   ├── Logo.tsx
│   │   └── Modal.tsx         # Generic modal component
│   ├── config/               # Configuration files
│   ├── contexts/             # React Context providers
│   │   ├── EstimateModalContext.tsx
│   │   └── EstimateModalContextDefinition.ts
│   ├── hooks/                # Custom React hooks
│   │   ├── useEstimateModal.ts
│   │   └── useIsMobile.ts    # Responsive breakpoint hook
│   ├── pages/                # Page components
│   │   ├── Home.tsx          # Main landing page
│   │   ├── components/       # Page section components
│   │   │   ├── About.tsx
│   │   │   ├── bar.tsx       # Decorative bar component
│   │   │   ├── Contact.tsx
│   │   │   ├── ContactLayout.tsx
│   │   │   ├── Hero.tsx      # Hero section with CTA
│   │   │   ├── hero-logo.tsx
│   │   │   ├── Map.tsx       # Leaflet map component
│   │   │   ├── Pricing.tsx
│   │   │   ├── Quote.tsx     # Quote form (detailed)
│   │   │   └── Services.tsx
│   │   └── utils/            # Page utilities
│   │       └── text-classes.ts
│   ├── App.tsx               # Root application component
│   ├── App.css               # Component-specific styles
│   ├── index.css             # Global styles and Tailwind imports
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite type declarations
├── test-email.js             # Email function testing script
├── EMAIL_SETUP.md            # Email configuration guide
├── package.json              # Dependencies and scripts
├── tsconfig.app.json         # TypeScript app config
├── tsconfig.node.json        # TypeScript node config
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── eslint.config.js          # ESLint configuration
└── vercel.json               # Vercel deployment config
```

## Build and Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Convert SVG files to React components
npm run svg-to-component

# Test email functionality
npm run test-email
```

## Key Features

### 1. Hero Section with Dynamic CTA
- Full-screen hero with background image
- Navigation to `/quote` route opens estimate modal
- Dual call-to-action: "Message Us" and "Call Us"
- Responsive design with mobile-specific behavior

### 2. Quote Request System (YardBook Integration)
The main lead capture uses an iframe embedding YardBook's quote form:
- **Modal Component**: `EstimateModal.tsx`
- **External URL**: `https://www.yardbook.com/new_quote/5a5f72252b52b4a0797e828f1dadbdfc5c81b97c`
- **Trigger**: Navigation to `/quote` or "Message Us" button click
- **Behavior**: Modal opens automatically on `/quote` route via context

### 3. Legacy Quote Form (Detailed Form)
Located in `src/pages/components/Quote.tsx` - a comprehensive form with:
- React Hook Form for validation
- Address autocomplete via Nominatim API (OpenStreetMap)
- Live map preview using Leaflet
- Property size auto-estimation from geocoding data
- Multi-select service options
- **Note**: This form is currently not active in the UI but maintained for potential future use

### 4. Email Notification System
Serverless function at `/api/send-quote.js`:
- Sends professional HTML emails via Resend API
- Includes customer info, property details, and service requests
- Central Time timestamp formatting
- Reply-to header set to customer email
- **Recipient**: info@bigthicketlawn.com
- **Sender**: estimate@bigthicketlawn.com

### 5. Responsive Navigation
- Sticky header that appears on scroll
- Mobile menu with hamburger toggle (currently hidden)
- Logo reveal animation on scroll past hero

### 6. Interactive Map
- Leaflet map showing service area (Lumberton, TX)
- Updates when address is selected in quote form
- Default view centered on Lumberton

## Code Style Guidelines

### TypeScript Conventions
- Strict TypeScript configuration enabled
- Interface-first approach for component props
- Type definitions in separate files when shared
- Use of `type` imports for type-only imports

### Component Structure
- Functional components with explicit return types
- Props destructuring in function parameters
- Custom hooks for shared logic
- Context providers for global state (modal state)

### Styling Conventions
- Tailwind CSS utility classes preferred
- Custom CSS in `index.css` for:
  - Font definitions
  - CSS variables
  - Complex animations
  - Font loading optimizations
- Custom font families:
  - `font-decorative`: 'Bungee', 'Impact', 'Arial Black', sans-serif
  - `font-main`: 'Roboto Condensed', sans-serif

### File Naming
- PascalCase for component files (e.g., `Hero.tsx`, `Header.tsx`)
- camelCase for utility files (e.g., `text-classes.ts`)
- Lowercase for page sub-components (e.g., `bar.tsx`)

## Development Conventions

### Environment Variables
Required environment variables (set in `.env.local` for local, Vercel dashboard for production):
```
RESEND_API_KEY=re_xxxxxxxxxxxx  # Resend API key for email
```

### Form Development
- Quote form has autofill helper for development (`import.meta.env.DEV` check)
- Development mode simulates API calls without sending real emails
- Map component renders with test coordinates in dev mode

### Geocoding
- Uses Nominatim OpenStreetMap API (free, no key required)
- Bounded search to Texas region for better results
- Requires User-Agent header as per Nominatim policy

## Security Considerations

### API Keys
- **Resend API Key**: Stored in environment variables only
- Never commit `.env.local` to version control (in `.gitignore`)
- API key present in `test-email.js` is a production key - treat carefully

### Email Security
- Serverless function validates required fields
- Reply-to header ensures customer responses go to correct address
- No sensitive data logged to console in production

### Form Validation
- Client-side validation via React Hook Form
- Server-side validation in `/api/send-quote.js`
- Input sanitization through template literals in email HTML

## Testing

### Email Testing
Run the test script to verify email functionality:
```bash
npm run test-email
```

This simulates a Vercel function invocation with mock request/response objects.

### Local Development Notes
- Email sending only works in production (Vercel) or with `test-email.js`
- Development mode simulates successful form submission
- Map displays default Lumberton coordinates when no address selected

## Deployment

### Vercel Configuration
- `vercel.json`: SPA routing (all routes → index.html)
- API functions automatically deployed from `/api` directory
- Environment variables configured in Vercel dashboard

### Build Output
- Static files generated in `dist/` directory
- TypeScript compilation via `tsc -b`
- Vite handles bundling and optimization

## Analytics Integration

### Microsoft Clarity
- Initialized in `App.tsx` useEffect
- Project ID: `ssxc6ul0zu`
- Captures user sessions, heatmaps, and scroll tracking

### Vercel Analytics
- Web vitals tracking enabled
- Performance metrics dashboard in Vercel

## Troubleshooting

### Common Issues

1. **Email not sending in development**
   - Expected behavior: emails only send via serverless function
   - Use `npm run test-email` to test email functionality

2. **Map not displaying**
   - Check Leaflet CSS is imported
   - Verify coordinates are valid numbers
   - Ensure container has defined height

3. **Font loading issues**
   - Fonts loaded via Google Fonts with `display=swap`
   - Preconnect hints in HTML head

## External Dependencies

### Critical Third-Party Services
- **YardBook**: Quote form iframe (external dependency)
- **Resend**: Email delivery
- **Nominatim**: Address geocoding
- **OpenStreetMap**: Map tiles
- **Google Fonts**: Typography (Bungee, Roboto Condensed)
- **Sanity**: Headless CMS for content management
- **SmugMug**: Image hosting (external URLs stored in Sanity)

---

# NEW: Sanity CMS Integration (v2.0)

## Overview
The site now uses **Sanity.io** as a headless CMS for managing dynamic content. This allows non-technical users (your parents) to update testimonials, photo galleries, services, and site settings through a polished web interface or mobile app.

**Sanity Project ID**: `hj2wzg7f`
**Dataset**: `production`
**Studio URL**: https://hj2wzg7f.sanity.studio/

## Content Architecture

### Content Types

| Type | Description | Managed In |
|------|-------------|------------|
| **Testimonials** | Customer reviews with star ratings | Sanity Studio |
| **Photo Galleries** | Before/after project photos | Sanity Studio |
| **Services** | Dynamic service listings | Sanity Studio |
| **Facebook Imports** | Staging area for FB content | Sanity Studio |
| **Site Settings** | Phone, hours, hero text, SEO | Sanity Studio |

### Image Strategy
All images are hosted on **SmugMug** (user's existing account) and referenced in Sanity by URL:
- Upload to SmugMug first
- Copy image URL from SmugMug
- Paste URL in Sanity field
- Keeps Sanity free tier unlimited

## File Structure Updates

```
big-thicket-lawn/
├── api/                      # Vercel serverless functions
│   ├── send-quote.js         # Email sending endpoint
│   ├── sync-facebook.js      # Facebook → Sanity sync (cron)
│   └── approve-facebook.js   # Approve FB imports
├── studio/                   # Sanity Studio configuration
│   ├── schemas/              # Content type definitions
│   │   ├── testimonial.ts    # Testimonial schema
│   │   ├── photoGallery.ts   # Before/after gallery schema
│   │   ├── service.ts        # Service listing schema
│   │   ├── facebookImport.ts # Facebook staging schema
│   │   ├── siteSettings.ts   # Global settings schema
│   │   └── index.ts          # Schema exports
│   ├── sanity.config.ts      # Studio configuration
│   └── package.json          # Studio dependencies
├── src/
│   ├── lib/
│   │   └── sanity.ts         # Sanity client + types + queries
│   ├── hooks/
│   │   └── useSanity.ts      # React hooks for fetching data
│   └── components/
│       ├── TestimonialsSection.tsx  # Example: dynamic testimonials
│       └── BeforeAfterGallery.tsx   # Example: before/after slider
└── .env.example              # Environment variables template
```

## Environment Variables

Add to `.env.local` (local) and Vercel dashboard (production):

```
# Sanity (required for read operations)
VITE_SANITY_PROJECT_ID=hj2wzg7f
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Sanity Write Token (required for API routes)
SANITY_TOKEN=your_sanity_api_token_here

# Facebook Integration
FACEBOOK_PAGE_ACCESS_TOKEN=your_facebook_page_token
FACEBOOK_PAGE_ID=your_facebook_page_id
```

## Sanity Studio Setup

### 1. Deploy the Studio
```bash
cd studio
npm install
npm run deploy
```

### 2. Access the Studio
- Web: https://hj2wzg7f.sanity.studio/
- Mobile: Download "Sanity Studio" app

### 3. Configure CORS
In Sanity project settings, add:
- `http://localhost:5173` (local dev)
- `https://www.bigthicketlawn.com` (production)

## Data Fetching

### Basic Hook Usage
```tsx
import {useFeaturedTestimonials} from '../hooks/useSanity'

function MyComponent() {
  const {data, loading, error} = useFeaturedTestimonials()
  
  if (loading) return <Loading />
  if (error) return <Error />
  
  return (
    <div>
      {testimonials.map(t => (
        <TestimonialCard key={t._id} data={t} />
      ))}
    </div>
  )
}
```

### Available Hooks
- `useFeaturedTestimonials()` - Homepage testimonial carousel
- `useAllTestimonials()` - Full testimonials page
- `useFeaturedGalleries()` - Homepage before/after showcase
- `useAllGalleries()` - Full gallery page
- `useActiveServices()` - Services listings
- `useSiteSettings()` - Global settings
- `usePendingFacebookImports()` - Admin review queue

## Facebook Integration

### Auto-Sync Workflow
1. Vercel Cron runs every 6 hours: `0 */6 * * *`
2. Fetches new posts from Facebook Page
3. Creates "Facebook Import" documents with status `pending`
4. Admin reviews in Sanity Studio
5. One-click approve as testimonial or gallery

### Manual Approval API
```bash
POST /api/approve-facebook
{
  "importId": "fb-import-123456",
  "action": "testimonial|gallery|reject",
  "reviewerName": "Chris"
}
```

## Usage Examples

### Adding a Testimonial
1. Open Sanity Studio (mobile or web)
2. Click "Testimonials" → "Add New"
3. Fill in: name, quote, rating (1-5)
4. Upload customer photo to SmugMug, paste URL
5. Select service type
6. Toggle "Featured" to show on homepage
7. Publish

### Adding Before/After Gallery
1. Upload before/after photos to SmugMug
2. In Sanity, go to "Photo Galleries"
3. Add title, paste both SmugMug URLs
4. Add description, select category
5. Set completion date
6. Toggle "Featured" for homepage
7. Publish

### Managing Services
1. Edit existing services to update descriptions/pricing
2. Toggle "Active" to show/hide from site
3. Change "Display Order" to reorder listings
4. All changes reflect immediately on the site

## Development Commands

```bash
# Install Sanity dependencies
npm install

# Start dev server (includes Sanity client)
npm run dev

# Deploy Studio updates
cd studio && npm run deploy

# Test Facebook sync (manual trigger)
curl https://www.bigthicketlawn.com/api/sync-facebook
```

## Migration Notes

### Existing Static Content
The original static content in `src/pages/components/` is preserved:
- `About.tsx` - Can be replaced with dynamic content from Site Settings
- `Services.tsx` - Can be replaced with dynamic Service content
- `Contact.tsx` - Can pull phone/hours from Site Settings

### Gradual Migration Strategy
1. Add Sanity-powered sections alongside existing ones
2. Test with your parents using the Studio
3. Once comfortable, swap static sections for dynamic ones
4. Keep YardBook integration unchanged (quote system stays as-is)

## Cost Analysis

| Service | Free Tier | When You'd Pay |
|---------|-----------|----------------|
| Sanity | Unlimited reads, 10 users, 2GB assets | >2GB assets (~4,000 photos) |
| Vercel | 100GB bandwidth, unlimited sites | >100GB/month |
| SmugMug | User's existing account | Already paid |
| Facebook API | Unlimited page posts | Never |
| **Total** | **$0/mo** | Only if >2GB images |

## Troubleshooting

### Images not loading
- Verify SmugMug URLs are correct (should be direct image URLs)
- Check CORS settings in Sanity for your domain
- Ensure images are public/shared on SmugMug

### Content not updating
- Check that documents are "Published" not just "Draft"
- Clear browser cache or use incognito
- Verify `useCdn: true` is set for production (has 1-2 min cache)

### Facebook sync not working
- Verify `FACEBOOK_PAGE_ACCESS_TOKEN` is set and not expired
- Check token has `pages_read_engagement` permission
- Review Vercel function logs for errors

### Studio won't load
- Check CORS origins include your domain
- Verify you're logged into Sanity with correct account
- Try incognito/private browsing mode
