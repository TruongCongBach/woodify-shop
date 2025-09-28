// Re-export all types from a central location
export * from './Product'
export * from './Category'
export * from './Review'

// Common shared types
export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface PaginationProps {
  page: number
  limit: number
  total: number
}

export interface BaseEntity {
  id: string
  created_at?: string
  updated_at?: string
}

export interface ErrorState {
  error: string | null
  isError: boolean
}

export interface LoadingState {
  loading: boolean
  isLoading: boolean
}
