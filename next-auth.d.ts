import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'
import { UserProfile } from '@prisma/client'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    profile: UserProfile
    organizations: [] | any 
    orgs: [] | any  
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      profile: UserProfile
      organizations: [] | any 
      orgs: [] | any 
    } & DefaultSession['user']
  }

  interface User {
    id: string
    profile: UserProfile
    organizations: [] | any 
    orgs: [] | any 
  }
}
