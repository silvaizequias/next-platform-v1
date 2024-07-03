export interface Handler {
  cache?: number
  endpoint?: string
  id?: string
  inputs?: any
  path: string
  revalidate?: string
  tag: string
  token?: string
}
