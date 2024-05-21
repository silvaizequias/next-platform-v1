export type OrderType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  code: string
  requirement: string
  subject: string
  price: number
  observation: string
  organization: string
  customer: string
  member: string
  originZipCode: string
  originComplement: string
  originLatitude: number
  originLongitude: number
  destinationZipCode: string
  destinationComplement: string
  destinationLatitude: number
  destinationLongitude: number
  latitude: number
  longitude: number
  directions: string
  deadline: Date
  started: boolean
  startDate: Date
  startNote: string
  completed: boolean
  completionDate: Date
  completionNote: string
  canceled: boolean
  cancellationDate: Date
  cancellationNote: string
  notes: NoteType[] | any
  items: ItemType[] | any
  attachments: AttachmentType[] | any
}

export type NoteType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  orderId: string
  order: OrderType | any
  content: string
  member: string
  customer: string
}

export type ItemType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  orderId: string
  order: OrderType | any
  code: string
  note: string
  amount: number
  file: string
}

export type AttachmentType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  orderId: string
  order: OrderType | any
  code: string
  note: string
  file: string
}
