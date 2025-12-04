import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    pt: 'Rodapé',
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
      name: 'footerText',
      type: 'textarea',
      localized: true,
      label: {
        en: 'Footer Text',
        pt: 'Texto do Rodapé',
      },
      admin: {
        description: {
          en: 'Copyright text or footer message',
          pt: 'Texto de copyright ou mensagem do rodapé',
        },
      },
    },
  ],
}
