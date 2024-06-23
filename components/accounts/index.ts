import { CREATE, UPDATE } from './schemas'
import { Account } from './types'

export default class Accounts {
  async create(_: unknown, form: FormData): Promise<any> {
    const inputs: any = Object.fromEntries(form)

    try {
      const validator = CREATE.safeParse(inputs)
      if (!validator.success)
        return { error: validator.error.flatten().fieldErrors }

      return {}
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  findAll(): Promise<Account[] | any> {
    try {
      const data: [] | any = []
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  findById(id: string): Promise<Account | any> {
    try {
      const data: any = ''
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  findByPhone(phone: string): Promise<Account | any> {
    try {
      const data: any = ''
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  async update(_: unknown, form: FormData) {
    const inputs: any = Object.fromEntries(form)
    const id = ''

    try {
      const validator = UPDATE.safeParse(inputs)
      if (!validator.success)
        return { error: validator.error.flatten().fieldErrors }

      return {}
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  remove(id: string, definitely: boolean): Promise<any> {
    try {
      const data: any = ''
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }
}
