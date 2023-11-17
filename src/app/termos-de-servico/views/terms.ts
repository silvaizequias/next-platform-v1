export type TermItemType = {
  id: string
  title: string
  description?: string
}

export type TermType = {
  id: string
  topic: string
  content?: string
  items?: TermItemType[]
}

export const termsOfService: TermType[] = []

export const termsOfUsage: TermType[] = []
