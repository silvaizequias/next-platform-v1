import { DomainType } from "../management/domains/types"

export type PublicationType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  channel: 'blog' | 'knowledge'
  title: string
  subject: string
  slug: string
  draft: boolean
  private: boolean
  spotlight: boolean
  generatedByAi: boolean
  resume: string
  image: string
  video: string
  content: string
  keywords: string
  author: string
  domain: DomainType
}
