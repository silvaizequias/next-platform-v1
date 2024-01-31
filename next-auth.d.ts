import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    profile: string
    active: boolean
    subscriber: boolean
    phone: string
    authorization?: string
    defaultOrganization?: string
    organizations?: []
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
      authorization?: string
      defaultOrganization?: string
      organizations?: []
    } & DefaultSession['user']
  }

  interface User {
    id: string
    profile: string
    active: boolean
    subscriber: boolean
    phone: string
    authorization?: string
    defaultOrganization?: string
    organizations?: []
  }
}
