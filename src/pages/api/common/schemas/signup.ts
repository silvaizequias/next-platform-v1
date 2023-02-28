import { boolean, object, string, TypeOf } from 'yup'

export const signUpSchema = object({
  acceptedTerms: boolean().required(),
  name: string().required().min(5).max(200),
  email: string().required().email().max(200),
  phone: string().required(),
})

export type SignUp = TypeOf<typeof signUpSchema>
