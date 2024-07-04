import * as z from 'zod'

export const createUser = z.object({})
export type createUserType = z.infer<typeof createUser>

export const updateUser = z.object({})
export type updateUserType = z.infer<typeof updateUser>

export const removeUser = z.object({})
export type removeUserType = z.infer<typeof removeUser>
