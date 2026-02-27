import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote/Review',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5 stars)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'photoUrl',
      title: 'Customer Photo URL (SmugMug)',
      type: 'url',
      description: 'Paste the SmugMug image URL here',
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          {title: 'Lawn Mowing', value: 'lawn-mowing'},
          {title: 'Landscaping', value: 'landscaping'},
          {title: 'Fertilization', value: 'fertilization'},
          {title: 'Leaf Removal', value: 'leaf-removal'},
          {title: 'Seasonal Cleanup', value: 'seasonal-cleanup'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Show this testimonial in the homepage carousel',
    }),
    defineField({
      name: 'date',
      title: 'Date of Service/Review',
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
      title: 'customerName',
      subtitle: 'quote',
      rating: 'rating',
    },
    prepare({title, subtitle, rating}) {
      const stars = '★'.repeat(rating || 0) + '☆'.repeat(5 - (rating || 0))
      return {
        title: `${title} - ${stars}`,
        subtitle: subtitle?.substring(0, 80) + (subtitle?.length > 80 ? '...' : ''),
      }
    },
  },
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Rating, Highest',
      name: 'ratingDesc',
      by: [{field: 'rating', direction: 'desc'}],
    },
  ],
})
