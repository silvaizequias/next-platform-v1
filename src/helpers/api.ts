import axios from 'axios'

const NEXT_PUBLIC_DEDICATED_API_KEY = process.env.NEXT_PUBLIC_DEDICATED_API_KEY!

export const api = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  headers: {
    Authorization: `${NEXT_PUBLIC_DEDICATED_API_KEY}`,
  },
})
