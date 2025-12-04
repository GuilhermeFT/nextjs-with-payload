/**
 * Default site configuration and constants
 */
export const SITE_CONFIG = {
  /**
   * Default metadata values used as fallback
   */
  defaultMetadata: {
    title: 'Example Site | Your Tagline Here',
    description:
      'An example website description showcasing your products, services, or content.',
  },

  /**
   * Social media and Open Graph configurations
   */
  social: {
    twitterHandle: '@example',
    ogType: 'website' as const,
  },

  /**
   * Image defaults for Open Graph
   */
  image: {
    defaultAlt: 'Example Site Logo',
    ogImageAlt: 'Example OG Image',
  },
} as const

export type SiteConfig = typeof SITE_CONFIG
