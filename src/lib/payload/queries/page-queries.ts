import type { Page } from '@payload-types'
import type { QueryResult } from '../types/query-types'
import { withPayload } from '../client'
import { Locale } from '@/lib/i18n/config'

export async function getPageBySlug(
  slug: string = '',
  locale: Locale
): Promise<QueryResult<Page>> {
  try {
    const pages = await withPayload(async (payload) => {
      return await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: slug,
          },
        },
        locale,
        fallbackLocale: 'pt',
        depth: 2,
        limit: 1,
      })
    })

    if (!pages.docs.length) {
      return {
        success: false,
        error: `Page with slug "${slug}" not found`,
      }
    }

    return { success: true, data: pages.docs[0] }
  } catch (error) {
    console.error('Failed to fetch page by slug:', error)
    return {
      success: false,
      error: 'Failed to load page data',
    }
  }
}

export async function getPageByFullPath(
  fullPath: string = '',
  locale: Locale
): Promise<QueryResult<Page>> {
  try {
    console.log('Looking for page with fullPath:', fullPath)

    // Se for homepage (vazio ou '/'), buscar pela flag isHomepage
    if (!fullPath || fullPath === '/') {
      const pages = await withPayload(async (payload) => {
        return await payload.find({
          collection: 'pages',
          where: {
            isHomepage: {
              equals: true,
            },
          },
          locale,
          fallbackLocale: 'pt',
          depth: 2,
          limit: 1,
        })
      })

      if (!pages.docs.length) {
        return {
          success: false,
          error: 'Homepage not found',
        }
      }

      return { success: true, data: pages.docs[0] }
    }

    // O plugin nested-docs gera breadcrumbs com URL a partir do slug
    // Podemos otimizar buscando pelo último slug do path
    const pathSegments = fullPath.split('/').filter(Boolean)
    const lastSlug = pathSegments[pathSegments.length - 1]

    // Buscar páginas com o slug final
    const pages = await withPayload(async (payload) => {
      return await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: lastSlug,
          },
        },
        locale,
        fallbackLocale: 'pt',
        depth: 2,
        limit: 10, // Pode haver múltiplas páginas com o mesmo slug (em diferentes hierarquias)
      })
    })

    // Se houver apenas uma página com esse slug, retornar ela
    if (pages.docs.length === 1) {
      return { success: true, data: pages.docs[0] }
    }

    // Se houver múltiplas, filtrar pelo breadcrumb.url completo
    const page = pages.docs.find((doc) => {
      if (!doc.breadcrumbs || doc.breadcrumbs.length === 0) return false
      const lastBreadcrumb = doc.breadcrumbs[doc.breadcrumbs.length - 1]
      return lastBreadcrumb?.url === `/${fullPath}`
    })

    if (!page) {
      return {
        success: false,
        error: `Page with path "${fullPath}" not found`,
      }
    }

    return { success: true, data: page }
  } catch (error) {
    console.error('Failed to fetch page by full path:', error)
    return {
      success: false,
      error: 'Failed to load page data',
    }
  }
}
