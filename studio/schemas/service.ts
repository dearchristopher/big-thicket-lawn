import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (for cards)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(150),
      description: 'Brief description shown on service cards (max 150 chars)',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Detailed description shown on the service page',
    }),
    defineField({
      name: 'pricingText',
      title: 'Pricing Text',
      type: 'string',
      description: 'e.g., "Starting at $40/week" or "Custom quotes available"',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      options: {
        list: [
          {title: 'Lawn Mower', value: 'mower'},
          {title: 'Leaf/Tree', value: 'tree'},
          {title: 'Sparkles/Clean', value: 'sparkles'},
          {title: 'Droplet/Water', value: 'droplet'},
          {title: 'Sun/Seasonal', value: 'sun'},
          {title: 'Tools', value: 'tools'},
        ],
      },
      description: 'Select an icon to represent this service',
    }),
    defineField({
      name: 'photoUrl',
      title: 'Service Photo URL (SmugMug)',
      type: 'url',
      description: 'Hero image for this service page',
    }),
    defineField({
      name: 'orderIndex',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'isActive',
      title: 'Active/Visible',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this service from the site',
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Page title for search engines',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Meta description for search engines',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      isActive: 'isActive',
    },
    prepare({title, subtitle, isActive}) {
      return {
        title: `${title} ${isActive ? '' : '(Hidden)'}`,
        subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderIndexAsc',
      by: [{field: 'orderIndex', direction: 'asc'}],
    },
  ],
})
