import * as z from 'zod'

export const sendContactForm = z.object({
  name: z
    .string({ message: 'este campo é obrigatório' })
    .min(5, { message: 'o nome precisa ter no mínimo 5 letras' })
    .max(50, { message: 'o nome precisa ter até 50 caracteres' }),
  phone: z
    .string({ message: 'este campo é obrigatório' })
    .min(11, { message: 'precisa conter 55 + DDD + celular' })
    .max(13, { message: 'precisa conter 55 + DDD + celular' }),
  email: z
    .string({ message: 'este campo é obrigatório' })
    .email({ message: 'precisa ser um e-mail válido' }),
  subject: z
    .string({ message: 'este campo é obrigatório' })
    .min(5, { message: 'o assunto precisa ter no mínimo 5 letras' })
    .max(50, { message: 'o assunto precisa ter até 50 caracteres' }),
  message: z
    .string({ message: 'este campo é obrigatório' })
    .min(10, { message: 'a mensagem precisa conter no mínimo 10 caracteres' })
    .max(2000, { message: 'a mensage precisa ser de até 2000 caracteres' }),
})

export type sendContactFormType = z.infer<typeof sendContactForm>
