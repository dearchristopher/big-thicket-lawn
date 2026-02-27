import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'whyChooseUs',
  title: 'Why Choose Us - Reasons',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Local & Family Owned"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: 'Detailed explanation of this reason',
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Badge',
      type: 'string',
      description: 'Short badge text, e.g., "Lumberton Based", "Since 2018"',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Home (Local)', value: 'home'},
          {title: 'Users (People)', value: 'users'},
          {title: 'Zap (Fast)', value: 'zap'},
          {title: 'Shield (Trust)', value: 'shield'},
          {title: 'Star (Quality)', value: 'star'},
          {title: 'Heart (Care)', value: 'heart'},
          {title: 'Award (Best)', value: 'award'},
          {title: 'Check (Verified)', value: 'check'},
        ],
      },
      initialValue: 'home',
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
      description: 'Show this reason on the website',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      highlight: 'highlight',
      isActive: 'isActive',
    },
    prepare({title, highlight, isActive}) {
      return {
        title: title || 'Untitled',
        subtitle: `${highlight || 'No badge'} ${isActive ? '' : '(Hidden)'}`,
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
