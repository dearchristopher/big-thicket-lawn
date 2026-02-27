import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'facebookImport',
  title: 'Facebook Imports',
  type: 'document',
  fields: [
    defineField({
      name: 'fbPostId',
      title: 'Facebook Post ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'fbPermalinkUrl',
      title: 'Facebook Post URL',
      type: 'url',
      readOnly: true,
    }),
    defineField({
      name: 'content',
      title: 'Post Content',
      type: 'text',
      rows: 4,
      readOnly: true,
    }),
    defineField({
      name: 'mediaUrls',
      title: 'Media URLs',
      type: 'array',
      of: [{type: 'url'}],
      readOnly: true,
      description: 'Image/video URLs from the Facebook post',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Photo', value: 'photo'},
          {title: 'Video', value: 'video'},
          {title: 'Album', value: 'album'},
          {title: 'Text Only', value: 'text'},
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: 'importedAt',
      title: 'Imported At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending Review', value: 'pending'},
          {title: 'Approved as Testimonial', value: 'testimonial'},
          {title: 'Approved as Gallery', value: 'gallery'},
          {title: 'Rejected', value: 'rejected'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'suggestedAction',
      title: 'AI Suggested Action',
      type: 'string',
      options: {
        list: [
          {title: 'Testimonial', value: 'testimonial'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'None', value: 'none'},
        ],
      },
      readOnly: true,
      description: 'Auto-suggested based on content analysis',
    }),
    defineField({
      name: 'convertedToTestimonial',
      title: 'Linked Testimonial',
      type: 'reference',
      to: [{type: 'testimonial'}],
      readOnly: true,
      hidden: ({document}) => document?.status !== 'testimonial',
    }),
    defineField({
      name: 'convertedToGallery',
      title: 'Linked Gallery',
      type: 'reference',
      to: [{type: 'photoGallery'}],
      readOnly: true,
      hidden: ({document}) => document?.status !== 'gallery',
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Reviewed By',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'reviewedAt',
      title: 'Reviewed At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 2,
      description: 'Internal notes about this import',
    }),
  ],
  preview: {
    select: {
      title: 'fbPostId',
      content: 'content',
      status: 'status',
      mediaType: 'mediaType',
      suggestedAction: 'suggestedAction',
    },
    prepare({title, content, status, mediaType, suggestedAction}) {
      const statusEmoji: Record<string, string> = {
        pending: '⏳',
        testimonial: '✅',
        gallery: '✅',
        rejected: '❌',
      }
      const mediaEmoji: Record<string, string> = {
        photo: '📷',
        video: '🎥',
        album: '📸',
        text: '📝',
      }
      return {
        title: `${statusEmoji[status || 'pending']} ${mediaEmoji[mediaType || 'text']} ${content?.substring(0, 40) || title}${content?.length > 40 ? '...' : ''}`,
        subtitle: `${status}${suggestedAction && status === 'pending' ? ` (suggested: ${suggestedAction})` : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Import Date, Newest',
      name: 'importedDesc',
      by: [{field: 'importedAt', direction: 'desc'}],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{field: 'status', direction: 'asc'}],
    },
  ],
})
