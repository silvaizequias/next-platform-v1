import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'
import { UserProfile, UserRole } from '@prisma/client'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
    profile: UserProfile
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      role: UserRole
      profile: UserProfile
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: UserRole
    profile: UserProfile
  }
}
