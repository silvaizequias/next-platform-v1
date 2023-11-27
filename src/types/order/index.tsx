export type OrderAttachmentType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  orderId: string
  order: OrderType
  code: string
  note: string
  file: string
}

export type OrderItemType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  orderId: string
  order: OrderType
  code: string
  note: string
  amount: number
  file: string
}

export type OrderType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  code: string
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
  attachments: OrderAttachmentType[]
  items: OrderItemType[]
}
