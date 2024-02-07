export type PublicationType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  organization: string
  author: string
  channel: string
  draft: boolean
  private: boolean
  spotlight: boolean
  generatedByAi: boolean
  title: string
  subject: string
  slug: string
  resume: string
  image: string
  video: string
  content: string
  keywords: string
}
