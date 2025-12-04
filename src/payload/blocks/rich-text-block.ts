import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'rich-text',
  labels: {
    singular: {
      en: 'Content Section',
      pt: 'Seção de Conteúdo',
    },
    plural: {
      en: 'About Sections',
      pt: 'Seções de Conteúdo',
    },
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: {
        en: 'Content',
        pt: 'Conteúdo',
      },
    },
  ],
}
