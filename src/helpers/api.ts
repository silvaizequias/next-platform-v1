import axios from 'axios'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
const NEXT_PUBLIC_DEDICATED_API_KEY = process.env.NEXT_PUBLIC_DEDICATED_API_KEY!

export const api = axios.create({
  baseURL: NEXTAUTH_URL,
  //withCredentials: true,
  //headers: {
  //  Authorization: `${NEXT_PUBLIC_DEDICATED_API_KEY}`,
  //},
})
