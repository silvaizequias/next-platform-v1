import { object, string, TypeOf } from 'yup'

export const signInSchema = object({
  email: string().required().email().max(200),
  password: string().required().min(6).max(25)
})

export type SignIn = TypeOf<typeof signInSchema>
