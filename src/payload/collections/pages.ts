import type { CollectionConfig } from 'payload'
import { RichTextBlock } from '../blocks/rich-text-block'
import { slugField } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: {
      en: 'Page',
      pt: 'Página',
    },
    plural: {
      en: 'Pages',
      pt: 'Páginas',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'parent', 'isHomepage', 'updatedAt'],
    group: {
      en: 'Content',
      pt: 'Conteúdo',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Title',
        pt: 'Título',
      },
    },
    slugField({
      useAsSlug: 'title',
      name: 'slug',
      checkboxName: 'generateSlug',
      required: true,
      position: 'sidebar',
    }),
    {
      name: 'isHomepage',
      type: 'checkbox',
      defaultValue: false,
      label: {
        en: 'Is Homepage',
        pt: 'É a Página Inicial',
      },
      admin: {
        description: {
          en: 'Mark this page as the homepage (only one page should have this enabled)',
          pt: 'Marcar esta página como a página inicial (apenas uma página deve ter isso habilitado)',
        },
      },
      hooks: {
        beforeChange: [
          async ({ value, req, operation, originalDoc }) => {
            // Se está marcando como homepage
            if (value === true) {
              // Desmarcar todas as outras páginas como homepage
              const pages = await req.payload.find({
                collection: 'pages',
                where: {
                  isHomepage: {
                    equals: true,
                  },
                },
                limit: 100,
              })

              for (const page of pages.docs) {
                if (
                  operation === 'update' &&
                  originalDoc &&
                  page.id === originalDoc.id
                ) {
                  continue
                }
                await req.payload.update({
                  collection: 'pages',
                  id: page.id,
                  data: {
                    isHomepage: false,
                  },
                })
              }
            }
            return value
          },
        ],
      },
    },
    {
      name: 'sections',
      type: 'blocks',
      required: true,
      label: {
        en: 'Page Sections',
        pt: 'Seções da Página',
      },
      blocks: [RichTextBlock],
    },
  ],
}
