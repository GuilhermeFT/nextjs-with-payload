/**
 * Padrão de resposta para queries Payload
 * Permite error handling sem try/catch em componentes
 */
export interface ErrorResponse {
  success: false
  error: string
}

export interface SuccessResponse<T> {
  success: true
  data: T
}

export type QueryResult<T> = SuccessResponse<T> | ErrorResponse
