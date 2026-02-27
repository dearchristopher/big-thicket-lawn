import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionId',
      title: 'Section ID',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier (e.g., "final-cta", "hero-cta")',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for this CTA section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Supporting text below the title',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefit Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Small benefit tags displayed as pills (e.g., "No obligation", "Same-day response")',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Get Your Free Quote',
      description: 'Text for the main CTA button',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      description: 'Text for the secondary button (optional)',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      description: 'Small text at the bottom of the section',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          {title: 'Blue Gradient', value: 'blue'},
          {title: 'Green Gradient', value: 'green'},
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show this CTA section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sectionId: 'sectionId',
      isActive: 'isActive',
    },
    prepare({title, sectionId, isActive}) {
      return {
        title: title || 'Untitled CTA',
        subtitle: `${sectionId?.current || 'no-id'} ${isActive ? '' : '(Hidden)'}`,
      }
    },
  },
})
