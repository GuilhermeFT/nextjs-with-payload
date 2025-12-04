import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    plural: {
      en: 'Media',
      pt: 'Mídia',
    },
    singular: {
      en: 'Media',
      pt: 'Mídia',
    },
  },
  admin: {
    useAsTitle: 'alt',
    group: {
      en: 'Media',
      pt: 'Mídia',
    },
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        name: 'feature',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Alt Text',
        pt: 'Texto Alternativo',
      },
    },
  ],
}
