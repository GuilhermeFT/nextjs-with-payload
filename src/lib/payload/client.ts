import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Get Payload CMS client instance
 * IMPORTANTE: Só usar em Server Components, API Routes ou Server Actions
 */
export async function getPayloadClient() {
  const payload = await getPayload({ config })
  return payload
}

/**
 * Wrapper com error handling para queries Payload
 */
export async function withPayload<T>(
  callback: (payload: Awaited<ReturnType<typeof getPayload>>) => Promise<T>,
): Promise<T> {
  try {
    const payload = await getPayloadClient()
    return await callback(payload)
  } catch (error) {
    console.error('Payload client error:', error)
    throw new Error('Failed to fetch data from CMS')
  }
}
