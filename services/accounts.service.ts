import { removeAccount } from '@/repositories/accounts/DELETE'
import {
  findAccountById,
  findAccountByPhone,
  findAllAccounts,
} from '@/repositories/accounts/GET'
import { updateAccount } from '@/repositories/accounts/PATCH'
import { createAccount } from '@/repositories/accounts/POST'
import {
  AccountCreateValidatorType,
  AccountUpdateValidatorType,
} from '@/validators/accounts.validator'

export default class AccountsService {
  create(data: AccountCreateValidatorType) {
    return createAccount(data)
  }

  findAll() {
    return findAllAccounts()
  }

  findById(id: string) {
    return findAccountById(id)
  }

  findByPhone(phone: string) {
    return findAccountByPhone(phone)
  }

  update(id: string, data: AccountUpdateValidatorType) {
    return updateAccount(id, data)
  }

  remove(id: string, definitely: boolean) {
    return removeAccount(id, definitely)
  }
}
