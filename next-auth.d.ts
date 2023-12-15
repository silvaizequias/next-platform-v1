import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    profile: 'USER' | 'MASTER'
    authorization: string
    organizations: [] | null
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      profile: 'USER' | 'MASTER'
      authorization: string
      organizations: [] | null
    } & DefaultSession['user']
  }

  interface User {
    id: string
    profile: 'USER' | 'MASTER'
    authorization: string
    organizations: [] | null
  }
}
