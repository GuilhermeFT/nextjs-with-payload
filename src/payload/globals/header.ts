import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: {
    en: 'Header',
    pt: 'Cabeçalho',
  },
  admin: {
    group: {
      en: 'Settings',
      pt: 'Configurações',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      required: true,
      label: {
        en: 'Logo Text',
        pt: 'Texto do Logo',
      },
      admin: {
        description: {
          en: 'Text shown in the header logo',
          pt: 'Texto mostrado no logo do cabeçalho',
        },
      },
    },
    {
      name: 'navigation',
      type: 'array',
      label: {
        en: 'Navigation',
        pt: 'Navegação',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Label',
            pt: 'Rótulo',
          },
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          label: {
            en: 'Is External Link',
            pt: 'É um Link Externo',
          },
          admin: {
            description: {
              en: 'Check if the link points to an external website',
              pt: 'Marque se o link aponta para um site externo',
            },
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: {
            en: 'External URL',
            pt: 'URL Externa',
          },
          admin: {
            condition: (data, siblingData) => siblingData?.isExternal === true,
            description: {
              en: 'Enter the full external URL (e.g., https://example.com)',
              pt: 'Digite a URL externa completa (ex: https://exemplo.com)',
            },
          },
          required: true,
        },
        {
          name: 'internalPage',
          type: 'relationship',
          relationTo: 'pages',
          label: {
            en: 'Internal Page',
            pt: 'Página Interna',
          },
          admin: {
            condition: (data, siblingData) => siblingData?.isExternal !== true,
            description: {
              en: 'Select a page from your site',
              pt: 'Selecione uma página do seu site',
            },
          },
          required: true,
        },
      ],
    },
    {
      name: 'headerCTA',
      type: 'group',
      localized: true,
      label: {
        en: 'Header CTA',
        pt: 'CTA do Cabeçalho',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Label',
            pt: 'Rótulo',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: {
            en: 'URL',
            pt: 'URL',
          },
        },
      ],
    },
  ],
}
