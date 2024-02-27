import { register } from '@/repositories/register/POST'
import { RegisterSchemaType } from '@/schemas/register'

export const actionRegister = async (
  inputs: RegisterSchemaType,
): Promise<any> => {
  return await register(inputs)
}
