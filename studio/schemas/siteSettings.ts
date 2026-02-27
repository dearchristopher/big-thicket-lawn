import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // Contact Info
    defineField({
      name: 'phoneNumber',
      title: 'Business Phone Number',
      type: 'string',
      description: 'Primary contact phone (shown in header, footer, CTAs)',
    }),
    defineField({
      name: 'emailAddress',
      title: 'Business Email',
      type: 'string',
      description: 'Primary contact email',
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'text',
      rows: 3,
      description: 'e.g., "Mon-Fri: 8am-6pm, Sat: 8am-2pm, Sun: Closed"',
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service Area Description',
      type: 'text',
      rows: 2,
      description: 'e.g., "Serving Lumberton, Silsbee, Kountze, and surrounding areas"',
    }),
    defineField({
      name: 'yearEstablished',
      title: 'Year Established',
      type: 'number',
      description: 'For "Serving since XXXX" text',
      initialValue: 2018,
    }),
    
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Section Title',
      type: 'string',
      description: 'Main headline on homepage',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Section Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subheadline below the main title',
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero Background Image URL (SmugMug)',
      type: 'url',
      description: 'Full-width hero background image',
    }),
    defineField({
      name: 'heroServiceBadges',
      title: 'Hero Service Badges',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Service checkmarks shown in hero (e.g., "Mowing", "Trimming", "Landscaping", "Cleanups")',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Hero Primary CTA Text',
      type: 'string',
      initialValue: 'Message Us',
      description: 'Text for the main hero button',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Hero Secondary CTA Text',
      type: 'string',
      initialValue: 'Call Us',
      description: 'Text for the secondary hero button',
    }),
    
    // About Section
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      initialValue: 'ABOUT US',
      description: 'Title for the about section',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Main about/description content',
    }),
    defineField({
      name: 'aboutImageUrl',
      title: 'About Section Image URL',
      type: 'url',
      description: 'Photo shown in about section (e.g., photo of owners)',
    }),
    defineField({
      name: 'aboutImageCaption',
      title: 'About Image Caption',
      type: 'string',
      initialValue: 'Family-owned & operated',
      description: 'Caption below the about image',
    }),
    
    // Pricing Section
    defineField({
      name: 'pricingTitle',
      title: 'Pricing Section Title',
      type: 'string',
      initialValue: 'SERVICE PRICING',
      description: 'Title for pricing section',
    }),
    defineField({
      name: 'pricingSubtitle',
      title: 'Pricing Section Subtitle',
      type: 'string',
      initialValue: 'Top quality service at a price that makes sense',
      description: 'Subtitle for pricing section',
    }),
    defineField({
      name: 'pricingFooter',
      title: 'Pricing Footer Text',
      type: 'text',
      rows: 3,
      description: 'Footer notes displayed below pricing tiers',
    }),
    defineField({
      name: 'pricingCtaText',
      title: 'Pricing CTA Button Text',
      type: 'string',
      initialValue: 'Get Started',
      description: 'Text for pricing card buttons',
    }),
    
    // Why Choose Us Section
    defineField({
      name: 'whyChooseUsBadge',
      title: 'Why Choose Us - Badge Text',
      type: 'string',
      initialValue: 'Why Homeowners Choose Us',
      description: 'Small badge above the section title',
    }),
    defineField({
      name: 'whyChooseUsTitle',
      title: 'Why Choose Us - Title',
      type: 'string',
      initialValue: 'The Big Thicket Difference',
      description: 'Main section title',
    }),
    defineField({
      name: 'whyChooseUsSubtitle',
      title: 'Why Choose Us - Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subtitle/description below the title',
    }),
    defineField({
      name: 'whyChooseUsFooter',
      title: 'Why Choose Us - Footer Text',
      type: 'string',
      description: 'Trust statement at bottom of section',
    }),
    
    // Testimonials Section
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string',
      initialValue: 'What Our Customers Say',
      description: 'Title for testimonials section',
    }),
    defineField({
      name: 'testimonialsSubtitle',
      title: 'Testimonials Section Subtitle',
      type: 'string',
      initialValue: 'Real reviews from real customers in Lumberton, TX',
      description: 'Subtitle for testimonials section',
    }),
    
    // Gallery Section
    defineField({
      name: 'galleryTitle',
      title: 'Gallery Section Title',
      type: 'string',
      initialValue: 'Recent Transformations',
      description: 'Title for before/after gallery section',
    }),
    defineField({
      name: 'gallerySubtitle',
      title: 'Gallery Section Subtitle',
      type: 'string',
      initialValue: 'See the difference professional lawn care makes',
      description: 'Subtitle for gallery section',
    }),
    
    // FAQ Section
    defineField({
      name: 'faqBadge',
      title: 'FAQ - Badge Text',
      type: 'string',
      initialValue: 'Got Questions?',
      description: 'Badge above FAQ section title',
    }),
    defineField({
      name: 'faqTitle',
      title: 'FAQ - Title',
      type: 'string',
      initialValue: 'Common Questions Answered',
      description: 'FAQ section title',
    }),
    defineField({
      name: 'faqSubtitle',
      title: 'FAQ - Subtitle',
      type: 'string',
      initialValue: 'Everything you need to know about our lawn care services',
      description: 'FAQ section subtitle',
    }),
    defineField({
      name: 'faqCtaTitle',
      title: 'FAQ - CTA Title',
      type: 'string',
      initialValue: 'Still have questions?',
      description: 'Title for the FAQ call-to-action box',
    }),
    defineField({
      name: 'faqCtaText',
      title: 'FAQ - CTA Text',
      type: 'string',
      initialValue: "We're happy to answer any questions you have. Give us a call or send a message.",
      description: 'Text for the FAQ call-to-action box',
    }),
    defineField({
      name: 'faqCtaButtonText',
      title: 'FAQ - CTA Button Text',
      type: 'string',
      initialValue: 'Call or Text',
      description: 'Button text for FAQ CTA',
    }),
    
    // Contact Section
    defineField({
      name: 'contactTitle',
      title: 'Contact Section Title',
      type: 'string',
      initialValue: 'GET IN TOUCH',
      description: 'Title for contact section',
    }),
    defineField({
      name: 'contactSubtitle',
      title: 'Contact Section Subtitle',
      type: 'string',
      initialValue: 'Ready to chat?',
      description: 'Subtitle/heading for contact section',
    }),
    defineField({
      name: 'contactDescription',
      title: 'Contact Section Description',
      type: 'string',
      initialValue: "We're here to help with all your lawn care needs!",
      description: 'Description text for contact section',
    }),
    defineField({
      name: 'contactCallButtonText',
      title: 'Contact - Call Button Text',
      type: 'string',
      initialValue: 'Call Us',
      description: 'Text for call button',
    }),
    defineField({
      name: 'contactEmailButtonText',
      title: 'Contact - Email Button Text',
      type: 'string',
      initialValue: 'Email Us',
      description: 'Text for email button',
    }),
    defineField({
      name: 'contactFooter',
      title: 'Contact Section Footer',
      type: 'string',
      initialValue: 'Family-owned & operated in Southeast Texas',
      description: 'Footer text for contact section',
    }),
    
    // Footer
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      initialValue: 'Professional lawn care services in Southeast Texas',
      description: 'Tagline shown in footer',
    }),
    defineField({
      name: 'footerContactTitle',
      title: 'Footer Contact Title',
      type: 'string',
      initialValue: 'Contact Us',
      description: 'Title for contact info section in footer',
    }),
    
    // Trust Bar
    defineField({
      name: 'trustBarItems',
      title: 'Trust Bar Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Star (Rating)', value: 'star'},
                  {title: 'MapPin (Location)', value: 'mapPin'},
                  {title: 'Users (Family)', value: 'users'},
                  {title: 'Clock (Speed)', value: 'clock'},
                  {title: 'Shield (Trust)', value: 'shield'},
                  {title: 'Award (Quality)', value: 'award'},
                ],
              },
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              description: 'e.g., "Family Owned", "Same-Day Quotes"',
            }),
          ],
        },
      ],
      description: 'Trust badges shown below hero',
    }),
    
    // Navigation
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Link text',
            }),
            defineField({
              name: 'href',
              title: 'URL/Anchor',
              type: 'string',
              description: 'e.g., "#pricing", "#gallery", "/about"',
            }),
          ],
        },
      ],
      description: 'Main navigation links',
    }),
    defineField({
      name: 'navCtaText',
      title: 'Navigation CTA Button Text',
      type: 'string',
      initialValue: 'Get Quote',
      description: 'Text for CTA button in header',
    }),
    
    // Social Media
    defineField({
      name: 'facebookPageUrl',
      title: 'Facebook Page URL',
      type: 'url',
    }),
    defineField({
      name: 'facebookPageId',
      title: 'Facebook Page ID',
      type: 'string',
      description: 'Numeric ID of your Facebook page (for API integration)',
    }),
    defineField({
      name: 'facebookAccessToken',
      title: 'Facebook Access Token',
      type: 'string',
      description: 'Page access token for auto-import (stored securely)',
      hidden: true,
    }),
    
    // SEO
    defineField({
      name: 'metaTitle',
      title: 'Default SEO Title',
      type: 'string',
      description: 'Default page title for SEO',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 2,
      description: 'Default meta description for SEO',
    }),
  ],
  preview: {
    select: {
      title: 'phoneNumber',
    },
    prepare({title}) {
      return {
        title: 'Site Settings',
        subtitle: title,
      }
    },
  },
})
