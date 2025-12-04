import type { Seo } from '@payload-types'
import type { QueryResult } from '../types/query-types'
import type { MetadataInput } from '@/lib/utils/metadata-builder'
import { withPayload } from '../client'
import { extractMetaFromSEO } from '@/lib/utils/metadata-builder'
import { Locale } from '@/lib/i18n/config'

export async function getSEOData(locale: Locale): Promise<QueryResult<Seo>> {
  try {
    const seo = await withPayload(async (payload) => {
      return await payload.findGlobal({
        slug: 'seo',
        locale,
        fallbackLocale: 'pt',
      })
    })

    return { success: true, data: seo }
  } catch (error) {
    console.error('Failed to fetch SEO data:', error)
    return {
      success: false,
      error: 'Failed to load SEO configuration',
    }
  }
}

export async function getSEOMetadata(locale: Locale): Promise<MetadataInput> {
  const result = await getSEOData(locale)

  if (!result.success) {
    return {}
  }

  return extractMetaFromSEO(result.data)
}
