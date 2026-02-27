import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'phoneNumber',
      title: 'Business Phone Number',
      type: 'string',
      description: 'Primary contact phone (shown in header, footer, CTAs)',
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
      name: 'aboutText',
      title: 'About Section Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Main about/description content',
    }),
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
