type TopicType = {
  id?: string
  title: string
  description?: string
}

export type TermType = {
  id?: string
  subject: string
  content: string
  topic?: TopicType[]
}

export const terms: TermType[] = []
