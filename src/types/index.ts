import { UserType } from '@/views/users/types'
import { Session } from 'next-auth'
import { ReactNode } from 'react'

export type AccountType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  userId: string
  user: UserType
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string
  access_token: string
  expires_at: number
  token_type: string
  scope: string
  id_token: string
  session_state: string
}

export type SessionType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  userId: string
  user: UserType
  sessionToken: string
  expires: Date
}

export type VerificationTokenType = {
  identifier: string
  token: string
  expires: Date
}

export interface LayoutProps {
  children: ReactNode
}

export interface SessionProps {
  session: Session | null
}
