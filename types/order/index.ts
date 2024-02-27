import { AttachmentType } from '../attachment'
import { ItemType } from '../item'
import { NoteType } from '../note'

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
  attachments: AttachmentType[] | any
  items: ItemType[] | any
  notes: NoteType[] | any
}
