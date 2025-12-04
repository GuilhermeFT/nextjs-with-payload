import { Locale } from '@/lib/i18n/config'
import {
  getPageByFullPath,
  getPageBySlug,
} from '@/lib/payload/queries/page-queries'
import { getSEOMetadata } from '@/lib/payload/queries/seo-queries'
import {
  buildMetadata,
  extractMetaFromPayload,
} from '@/lib/utils/metadata-builder'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{ path: string[]; locale: Locale }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { path, locale } = await params

  // Construir o fullPath a partir do array path
  // Se não houver path, é a homepage
  const fullPath = path ? path.join('/') : ''

  console.log('Full path:', fullPath, 'Segments:', path)

  const result = await getPageByFullPath(fullPath, locale)

  if (result.success && result.data.meta) {
    const pageMeta = extractMetaFromPayload(result.data.meta)
    return buildMetadata(pageMeta)
  }

  const seoMeta = await getSEOMetadata(locale)
  return buildMetadata(seoMeta)
}

export default async function Page({ params }: PageProps) {
  const { path, locale } = await params

  const fullPath = path ? path.join('/') : ''

  const result = await getPageByFullPath(fullPath, locale)

  if (!result.success) {
    notFound()
  }

  const page = result.data

  return (
    <div>
      <h1>{page.title}</h1>
      <p>Path: {fullPath}</p>
    </div>
  )
}
