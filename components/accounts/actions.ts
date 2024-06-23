import { removeAccount } from '@/repositories/accounts/DELETE'
import {
  findAccountById,
  findAccountByPhone,
  findAllAccounts,
} from '@/repositories/accounts/GET'
import { updateAccount } from '@/repositories/accounts/PATCH'
import { createAccount } from '@/repositories/accounts/POST'
import { AccountCreateValidator, AccountUpdateValidator } from './validator'

export type Account = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  softDeleted?: boolean
  active?: boolean
  role?: string
  name: string
  image?: string
  email: string
  phone: string
  secret?: string
  document?: string
}

export default class AccountActions {
  async create(_: unknown, form: FormData): Promise<any> {
    const inputs: any = Object.fromEntries(form)

    const validator = AccountCreateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    return await createAccount(inputs).then((data) => {
      console.log(data)
      return {}
    })
  }

  findAll(): Promise<Account[] | any> {
    return findAllAccounts()
  }

  findById(id: string): Promise<Account | any> {
    return findAccountById(id)
  }

  findByPhone(phone: string): Promise<Account | any> {
    return findAccountByPhone(phone)
  }

  async update(_: unknown, form: FormData) {
    const inputs: any = Object.fromEntries(form)
    const id = ''

    const validator = AccountUpdateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    return await updateAccount(id, inputs).then((data) => {
      console.log(data)
      return {}
    })
  }

  remove(id: string, definitely: boolean): Promise<any> {
    return removeAccount(id, definitely)
  }
}
