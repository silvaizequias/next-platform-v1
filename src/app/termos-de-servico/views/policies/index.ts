type TopicType = {
  id?: string
  title: string
  description?: string
}

export type PoliciyType = {
  id?: string
  subject: string
  content: string
  topic?: TopicType[]
}

export const policies: PoliciyType[] = []
