import { environment } from '@/environments'

const baseUrl = environment.BASE_URL

export const onLive = process.env.NODE_ENV

export const apiUrl =
  onLive == 'production' ? `https://api.${baseUrl}` : `http://api.${baseUrl}`

export const blogUrl =
  onLive == 'production' ? `https://blog.${baseUrl}` : `http://blog.${baseUrl}`

export const controlUrl =
  onLive == 'production'
    ? `https://controle.${baseUrl}`
    : `http://controle.${baseUrl}`

export const mainUrl =
  onLive == 'production' ? `https://${baseUrl}` : `http://${baseUrl}`
