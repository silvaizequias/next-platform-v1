export interface Handler {
  cache?: number
  endpoint?: string
  id?: string
  inputs?: any
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  path: string
  revalidate?: string
  tag: string
  token?: string
}
