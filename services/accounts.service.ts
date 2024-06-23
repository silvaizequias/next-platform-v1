import { removeAccount } from '@/repositories/accounts/DELETE'
import {
  findAccountById,
  findAccountByPhone,
  findAllAccounts,
} from '@/repositories/accounts/GET'
import { updateAccount } from '@/repositories/accounts/PATCH'
import { createAccount } from '@/repositories/accounts/POST'
import {
  AccountCreateValidator,
  AccountCreateValidatorType,
  AccountUpdateValidator,
  AccountUpdateValidatorType,
} from '@/validators/accounts.validator'

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

export default class AccountsService {
  create(data: AccountCreateValidatorType) {
    return createAccount(data)
  }

  async createFormAction(_: unknown, form: FormData) {
    const inputs = Object.fromEntries(form)

    const validator = AccountCreateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    console.log(inputs)
    return {}
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

  update(id: string, data: AccountUpdateValidatorType): Promise<any> {
    return updateAccount(id, data)
  }

  async updateFormAction(_: unknown, form: FormData) {
    const inputs = Object.fromEntries(form)

    const validator = AccountUpdateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    console.log(inputs)
    return {}
  }

  remove(id: string, definitely: boolean): Promise<any> {
    return removeAccount(id, definitely)
  }
}
