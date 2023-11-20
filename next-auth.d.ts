import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'
import { UserProfile } from '@prisma/client'
import { OrganizationUserType } from '@/types/organization-user'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    profile: UserProfile
    organizations: OrganizationUserType[] | null
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      profile: UserProfile
      organizations: OrganizationUserType[] | null
    } & DefaultSession['user']
  }

  interface User {
    id: string
    profile: UserProfile
    organizations: OrganizationUserType[] | null
  }
}
