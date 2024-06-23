import { CREATE, UPDATE } from './schemas'
import { Organization } from './types'

export default class Organizations {
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

  async findAll(): Promise<Organization[] | any> {
    try {
      const data: any = {}
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  async findById(id: string): Promise<Organization | any> {
    try {
      const data: any = {}
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  async findByDocument(document: string): Promise<Organization | any> {
    try {
      const data: any = {}
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }

  async update(_: unknown, form: FormData, id: string): Promise<any> {
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

  async remove(id: string, definitely: boolean): Promise<any> {
    try {
      const data: any = {}
      return data
    } catch (error: any) {
      throw new Error(error?.message, error?.status)
    }
  }
}
