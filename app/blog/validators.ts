import * as z from 'zod'

export const PostCreateValidator = z.object({})
export type PostCreateValidatorType = z.infer<typeof PostCreateValidator>

export const PostUpdateValidator = z.object({})
export type PostUpdateValidatorType = z.infer<typeof PostUpdateValidator>

export const PostRemoveValidator = z.object({})
export type PostRemoveValidatorType = z.infer<typeof PostRemoveValidator>
