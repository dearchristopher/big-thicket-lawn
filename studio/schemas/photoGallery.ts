import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'photoGallery',
  title: 'Photo Galleries (Before/After)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'beforePhotoUrl',
      title: 'Before Photo URL (SmugMug)',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'The "before" state - paste SmugMug URL',
    }),
    defineField({
      name: 'afterPhotoUrl',
      title: 'After Photo URL (SmugMug)',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'The "after" state - paste SmugMug URL',
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of the work done',
    }),
    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          {title: 'Lawn Care', value: 'lawn-care'},
          {title: 'Landscaping', value: 'landscaping'},
          {title: 'Seasonal Cleanup', value: 'seasonal-cleanup'},
          {title: 'Fertilization/Treatment', value: 'fertilization'},
          {title: 'Leaf Removal', value: 'leaf-removal'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Show this project on the homepage gallery preview',
    }),
    defineField({
      name: 'completedDate',
      title: 'Date Completed',
      type: 'date',
    }),
    defineField({
      name: 'fromFacebook',
      title: 'Imported from Facebook',
      type: 'boolean',
      initialValue: false,
      readOnly: true,
    }),
    defineField({
      name: 'facebookPostId',
      title: 'Facebook Post ID',
      type: 'string',
      readOnly: true,
      hidden: ({document}) => !document?.fromFacebook,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
    },
    prepare({title, category}) {
      const categoryLabels: Record<string, string> = {
        'lawn-care': 'Lawn Care',
        'landscaping': 'Landscaping',
        'seasonal-cleanup': 'Seasonal Cleanup',
        'fertilization': 'Fertilization',
        'leaf-removal': 'Leaf Removal',
      }
      return {
        title,
        subtitle: categoryLabels[category] || category,
      }
    },
  },
})
