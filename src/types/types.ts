export type ApiResponse<T> = {
  status?: number
  data: T | null,
  errors: string | null
};