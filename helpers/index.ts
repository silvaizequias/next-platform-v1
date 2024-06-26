import { environment } from '@/environments'

const baseUrl = environment.baseUrl

export const onLive = process.env.NODE_ENV

export const mainUrl =
  onLive == 'production' ? `https://${baseUrl}` : `http://${baseUrl}`

export const apiUrl =
  onLive == 'production' ? `https://api.${baseUrl}` : `http://api.${baseUrl}`

export const blogUrl =
  onLive == 'production' ? `https://blog.${baseUrl}` : `http://blog.${baseUrl}`
