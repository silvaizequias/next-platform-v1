import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    profile: string
    active: boolean
    subscriber: boolean
    phone: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      profile: string
      active: boolean
      subscriber: boolean
      phone: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    profile: string
    active: boolean
    subscriber: boolean
    phone: string
  }
}
