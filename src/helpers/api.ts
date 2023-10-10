import axios from 'axios'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
const NEXT_PUBLIC_DEDICATED_API_KEY = process.env.NEXT_PUBLIC_DEDICATED_API_KEY!

export const api = axios.create({
  baseURL: NEXTAUTH_URL,
  //withCredentials: true,
  //headers: {
  //  'Access-Control-Allow-Credentials': 'true',
  //  'Access-Control-Allow-Origin': '*',
  //  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //  'Access-Control-Allow-Headers':
  //    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, //Content-MD5, //Content-Type, Date, X-Api-Version',
  //  Authorization: `${NEXT_PUBLIC_DEDICATED_API_KEY}`,
  //},
})
