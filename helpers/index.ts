import { environment } from '@/environments'

const baseUrl = environment.baseUrl

export const onLive = process.env.NODE_ENV

export const platformUrl =
  onLive == 'production' ? `https://${baseUrl}` : `http://${baseUrl}`

export const apiUrl =
  onLive == 'production' ? `https://api.${baseUrl}` : `http://api.${baseUrl}`
