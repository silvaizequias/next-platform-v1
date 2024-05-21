export type HandleImportType = {
  data: any[]
  document: string
  param: 'members' | 'orders' | 'tasks'
}

export type ImportMembersType = {
  profile?: 'guest' | 'consumer' | 'member' | 'master'
  name: string
  email: string
  phone: string
  document: string
  passHash?: string
  zipCode: string
  street: string
  complement?: string
  latitude?: number
  longitude?: number
}
