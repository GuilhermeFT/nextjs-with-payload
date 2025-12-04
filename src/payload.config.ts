import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'
import { en } from '@payloadcms/translations/languages/en'
import { pt } from '@payloadcms/translations/languages/pt'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

import {
  GenerateTitle,
  GenerateDescription,
  GenerateURL,
} from '@payloadcms/plugin-seo/types'
import { Media, Pages } from './payload/collections'
import { Footer, Header, SEO } from './payload/globals'

const generateTitle: GenerateTitle = async ({ doc, locale }) => {
  if (doc?.meta?.title) {
    if (typeof doc.meta.title === 'string') {
      return doc.meta.title
    }

    return doc.meta.title[locale || 'pt'] || ''
  }

  return doc?.meta?.title || doc?.title || ''
}

const generateDescription: GenerateDescription = async ({ doc, locale }) => {
  if (doc?.meta?.description) {
    if (typeof doc.meta.description === 'string') {
      return doc.meta.description
    }

    return doc.meta.description[locale || 'pt'] || ''
  }

  return doc?.meta?.description || ''
}

const generateURL: GenerateURL = async ({ doc, locale }) => {
  const slug = doc?.slug
  if (!slug) return ''

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://guilhermeft.dev'
  const localePrefix = locale && locale !== 'pt' ? `/${locale}` : ''

  return `${baseUrl}${localePrefix}/${slug}`
}

export default buildConfig({
  editor: lexicalEditor(),

  collections: [Pages, Media],

  globals: [Header, Footer, SEO],

  i18n: {
    supportedLanguages: {
      en,
      pt,
    },
    fallbackLanguage: 'pt',
  },

  localization: {
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'pt',
        label: 'Português (Brasil)',
      },
    ],
    defaultLocale: 'pt',
    fallback: true,
  },

  secret: process.env.PAYLOAD_SECRET || '',

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),

  sharp,

  plugins: [
    seoPlugin({
      collections: ['pages', 'projects'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle,
      generateDescription,
      generateURL,
    }),
    nestedDocsPlugin({
      collections: ['pages'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
  ],

  typescript: {
    outputFile: './src/payload-types.ts',
  },
})
