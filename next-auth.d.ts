import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    avatar: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      role: string
      avatar: string
    } & DefaultSession['user']
  }

  interface User {
    role: string
    avatar: string
  }
}
