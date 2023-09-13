import { UserType } from '@/views/control/users/types'
import { Session } from 'next-auth'

export type PostType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  userId: string
  user: UserType
  subject: string
  tags: string
  title: string
  slug: string
  resume: string
  image: string
  video: string
  audio: string
  content: string
  like: number
  isAvaliable: boolean
}

export interface PostViewProps {
  session: Session | null
  slug: string
}

export interface ShowPostCardProps {
  post: PostType
}
