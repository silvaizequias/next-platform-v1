export type PostType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted?: boolean
  active: boolean
  spotlight: string
  slug: string
  title: string
  resume: string
  content: string
}
