import { removeAccount } from '@/repositories/accounts/DELETE'
import {
  findAccountById,
  findAccountByPhone,
  findAllAccounts,
} from '@/repositories/accounts/GET'
import { updateAccount } from '@/repositories/accounts/PATCH'
import { createAccount } from '@/repositories/accounts/POST'

export default class AccountsService {
  create() {
    return createAccount()
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

  update(id: string) {
    return updateAccount(id)
  }

  remove(id: string, definitely: boolean) {
    return removeAccount(id, definitely)
  }
}
