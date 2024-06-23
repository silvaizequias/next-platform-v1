import { CREATE, UPDATE } from './schemas'
import { Member } from './types'

export default class Members {
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

  findAll(): Promise<Member[] | any> {
    try {
      const data: any = {}
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  findById(id: string): Promise<Member | any> {
    try {
      const data: any = {}
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  async update(_: unknown, form: FormData): Promise<any> {
    const inputs: any = Object.fromEntries(form)

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
      const data: any = {}
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }
}
