import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'
import { OrganizationUserType } from '@/types/organization-user'

declare module 'next-auth/jwt' {
  interface JWT {
    authorization?: string
    id: string
    profile: 'MASTER' | 'USER'
    organizations: OrganizationUserType[] | null
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      authorization?: string
      id: string
      profile: 'MASTER' | 'USER'
      organizations: OrganizationUserType[] | null
    } & DefaultSession['user']
  }

  interface User {
    authorization?: string
    id: string
    profile: 'MASTER' | 'USER'
    organizations: OrganizationUserType[] | null
  }
}
