import { environment } from '@/environments'

const baseUrl = environment.BASE_URL

export const onLive = process.env.NODE_ENV

export const apiUrl =
  onLive == 'production' ? `https://api.${baseUrl}` : `http://api.${baseUrl}`

export const authUrl =
  onLive == 'production'
    ? `https://acesso.${baseUrl}`
    : `http://acesso.${baseUrl}`

export const articleUrl =
  onLive == 'production'
    ? `https://artigos.${baseUrl}`
    : `http://artigos.${baseUrl}`

export const controlUrl =
  onLive == 'production'
    ? `https://controle.${baseUrl}`
    : `http://controle.${baseUrl}`

export const mainUrl =
  onLive == 'production' ? `https://www.${baseUrl}` : `http://${baseUrl}`
