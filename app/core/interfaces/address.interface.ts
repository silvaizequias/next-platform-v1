export interface Address {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  zipCode: string
  street: string
  complement: string
  district: string
  city: string
  state: string
  country: string
  latitude: number
  longitude: number
}
