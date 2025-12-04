'use client'

import { useFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import { TextInput } from '@payloadcms/ui'

export const FullPathPreview = () => {
  const slug = useFormFields(([fields]: any) => fields.slug)
  const parent = useFormFields(([fields]: any) => fields.parent)
  const isHomepage = useFormFields(([fields]: any) => fields.isHomepage)
  const [fullPath, setFullPath] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const calculateFullPath = async () => {
      // Se é homepage, fullPath é vazio
      if (isHomepage?.value === true) {
        setFullPath('/ (homepage)')
        return
      }

      const slugValue = slug?.value as string
      if (!slugValue) {
        setFullPath('')
        return
      }

      const parentValue = parent?.value

      // Se não tem parent, fullPath é só o slug
      if (!parentValue) {
        setFullPath(slugValue)
        return
      }

      // Se tem parent, buscar o fullPath do parent
      setLoading(true)
      try {
        const parentId =
          typeof parentValue === 'object' && parentValue !== null
            ? (parentValue as any).id || (parentValue as any).value
            : parentValue

        if (!parentId) {
          setFullPath(slugValue)
          return
        }

        // Buscar o parent via API
        const response = await fetch(`/api/pages/${parentId}`, {
          credentials: 'include',
        })

        if (response.ok) {
          const parentPage = await response.json()
          const parentFullPath = parentPage.fullPath || parentPage.slug || ''
          setFullPath(
            parentFullPath ? `${parentFullPath}/${slugValue}` : slugValue
          )
        } else {
          setFullPath(slugValue)
        }
      } catch (error) {
        console.error('Error fetching parent page:', error)
        setFullPath(slugValue)
      } finally {
        setLoading(false)
      }
    }

    calculateFullPath()
  }, [slug?.value, parent?.value, isHomepage?.value])

  return (
    <TextInput
      path="fullPath"
      label="Full Path (Preview)"
      value={loading ? 'Calculating...' : fullPath ? `/${fullPath}` : ''}
      readOnly
      description="This is a preview of the final URL path. It will be saved automatically."
    />
  )
}

FullPathPreview.displayName = 'FullPathPreview'
