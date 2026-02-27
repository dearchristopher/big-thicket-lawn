import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pricingTier',
  title: 'Pricing Tiers',
  type: 'document',
  fields: [
    defineField({
      name: 'size',
      title: 'Property Size',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "1/4 Acre", "1/2 Acre"',
    }),
    defineField({
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Service price in dollars',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'e.g., "Compact properties", "Standard residential lots"',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of included features',
    }),
    defineField({
      name: 'isPopular',
      title: 'Mark as Popular',
      type: 'boolean',
      initialValue: false,
      description: 'Highlight this as the most popular option',
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
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show this pricing tier',
    }),
  ],
  preview: {
    select: {
      title: 'size',
      price: 'price',
      isActive: 'isActive',
      isPopular: 'isPopular',
    },
    prepare({title, price, isActive, isPopular}) {
      return {
        title: `${title} - $${price || 0}`,
        subtitle: `${isPopular ? '⭐ Popular • ' : ''}${isActive ? 'Active' : 'Hidden'}`,
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
