import type { GlobalConfig } from 'payload'

export const SEO: GlobalConfig = {
  slug: 'seo',
  label: {
    en: 'SEO',
    pt: 'SEO',
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
      name: 'siteName',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Site Name',
        pt: 'Nome do Site',
      },
      admin: {
        description: {
          en: 'Used as the default site title',
          pt: 'Usado como título padrão do site',
        },
      },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      required: true,
      localized: true,
      label: {
        en: 'Site Description',
        pt: 'Descrição do Site',
      },
      admin: {
        description: {
          en: 'Default meta description for the site',
          pt: 'Descrição meta padrão para o site',
        },
      },
    },
    {
      name: 'siteUrl',
      type: 'text',
      required: true,
      label: {
        en: 'Site URL',
        pt: 'URL do Site',
      },
      admin: {
        description: {
          en: 'Full URL of your site (e.g., https://guilhermeft.dev)',
          pt: 'URL completa do seu site (ex: https://guilhermeft.dev)',
        },
      },
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Default Open Graph Image',
        pt: 'Imagem Open Graph Padrão',
      },
      admin: {
        description: {
          en: 'Fallback image for social media sharing',
          pt: 'Imagem de fallback para compartilhamento em redes sociais',
        },
      },
    },
    {
      name: 'analytics',
      type: 'group',
      label: {
        en: 'Analytics',
        pt: 'Analytics',
      },
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          label: {
            en: 'Google Analytics ID',
            pt: 'ID do Google Analytics',
          },
          admin: {
            description: {
              en: 'GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
              pt: 'ID de medição GA4 (ex: G-XXXXXXXXXX)',
            },
          },
        },
        {
          name: 'googleTagManagerId',
          type: 'text',
          label: {
            en: 'Google Tag Manager ID',
            pt: 'ID do Google Tag Manager',
          },
          admin: {
            description: {
              en: 'GTM Container ID (e.g., GTM-XXXXXXX)',
              pt: 'ID do container GTM (ex: GTM-XXXXXXX)',
            },
          },
        },
      ],
    },
  ],
}
