import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ - Frequently Asked Questions',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'Pricing', value: 'pricing'},
          {title: 'Services', value: 'services'},
          {title: 'Scheduling', value: 'scheduling'},
          {title: 'Payment', value: 'payment'},
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'orderIndex',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this FAQ on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
      isActive: 'isActive',
    },
    prepare({title, category, isActive}) {
      return {
        title: title || 'Untitled FAQ',
        subtitle: `${category || 'General'} ${isActive ? '' : '(Inactive)'}`,
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
