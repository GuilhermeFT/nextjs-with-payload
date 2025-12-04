/**
 * Utilitário para gerar slugs URL-friendly a partir de texto
 */

/**
 * Converte texto em slug kebab-case
 * @param text - Texto para converter em slug
 * @returns Slug no formato kebab-case
 *
 * @example
 * formatSlug('Minha Página Especial') // 'minha-pagina-especial'
 * formatSlug('Página com Acentuação') // 'pagina-com-acentuacao'
 * formatSlug('Título com 123 números!') // 'titulo-com-123-numeros'
 */
export function formatSlug(text: string): string {
  if (!text) return ''

  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Normalizar caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remover marcas diacríticas (acentos)
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiais (mantém letras, números, espaços e hífens)
    .replace(/\s+/g, '-') // Substituir espaços (um ou mais) por hífens
    .replace(/--+/g, '-') // Substituir múltiplos hífens consecutivos por um único
    .replace(/^-+|-+$/g, '') // Remover hífens do início e fim
}
