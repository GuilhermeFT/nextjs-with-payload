import type { Metadata } from 'next'
import type { Media, Seo } from '@payload-types'
import type { Meta } from '@payloadcms/plugin-seo/types'
import { SITE_CONFIG } from './site-config'

/**
 * Image metadata structure compatible with both OG and Twitter
 */
export interface ImageMetadata {
  url: string
  width?: number | null
  height?: number | null
  alt?: string | null
}

/**
 * Normalized metadata input structure
 */
export interface MetadataInput {
  title?: string | null
  description?: string | null
  image?: ImageMetadata | null
  ogType?: 'website' | 'article' | 'profile'
}

/**
 * Builds Open Graph image metadata
 */
function buildImageMetadata(
  image: ImageMetadata | null | undefined,
  defaultAlt: string
) {
  if (!image?.url) return undefined

  return [
    {
      url: image.url,
      width: image.width || undefined,
      height: image.height || undefined,
      alt: image.alt || defaultAlt,
    },
  ]
}

/**
 * Builds a complete Next.js Metadata object with proper fallbacks
 */
export function buildMetadata(input: MetadataInput = {}): Metadata {
  const { defaultMetadata, social, image: imageConfig } = SITE_CONFIG

  const title = input.title || defaultMetadata.title
  const description = input.description || defaultMetadata.description
  const ogType = input.ogType || social.ogType

  const images = buildImageMetadata(input.image, imageConfig.ogImageAlt)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: ogType,
    },
    twitter: {
      title,
      description,
      images,
    },
  }
}

/**
 * Normalizes Payload Media type to ImageMetadata
 */
function normalizeMedia(media: number | Media | null | undefined): ImageMetadata | null {
  if (!media || typeof media === 'number') return null

  return {
    url: media.url || '',
    width: null,
    height: null,
    alt: media.alt || null,
  }
}

/**
 * Extracts metadata from Payload SEO plugin Meta field
 * Handles both the strict Meta type and the nullable version from Payload
 */
export function extractMetaFromPayload(meta: Meta | {
  title?: string | null
  description?: string | null
  image?: number | Media | null
} | null | undefined): MetadataInput {
  if (!meta) return {}

  return {
    title: meta.title || null,
    description: meta.description || null,
    image: normalizeMedia(meta.image),
  }
}

/**
 * Extracts metadata from SEO global
 */
export function extractMetaFromSEO(seo: Seo | null | undefined): MetadataInput {
  if (!seo) return {}

  return {
    title: seo.siteName,
    description: seo.siteDescription,
    image: normalizeMedia(seo.defaultOgImage),
  }
}
