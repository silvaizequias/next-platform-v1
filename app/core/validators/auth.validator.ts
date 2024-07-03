import * as z from 'zod'

export const authLogin = z.object({})
export type authLoginType = z.infer<typeof authLogin>

export const authCode = z.object({})
export type authCodeType = z.infer<typeof authCode>
