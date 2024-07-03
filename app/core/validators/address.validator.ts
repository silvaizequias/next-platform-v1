import * as z from 'zod'

export const createAddress = z.object({})
export type createAddressType = z.infer<typeof createAddress>

export const updateAddress = z.object({})
export type updateAddressType = z.infer<typeof updateAddress>
