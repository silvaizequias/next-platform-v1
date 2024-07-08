import { CallbackPromise } from '../types/promise.type'
import { authCodeType, authLoginType } from '../validators/auth.validator'
import { JWTService } from './jwt.service'
import { repositoryValidateUser } from '../repositories/users/create'
import { repositoryVerifyUser } from '../repositories/users/find'

export default class AuthService {
  private jwtService = new JWTService()

  async login(authLogin: authLoginType): Promise<CallbackPromise> {
    return await repositoryVerifyUser(authLogin)
      .then(async (data) => {
        return await this.jwtService
          .payload(data?.response?.id)
          .then((data) => {
            return {
              success: data.success,
              message: `Boas vindas ${data?.response.name ?? ''}!`,
              response: data.response,
            }
          })
      })
      .catch((error) => {
        return {
          success: false,
          message: error?.message,
          status: error?.status,
        }
      })
  }

  async code(authCode: authCodeType): Promise<CallbackPromise> {
    return await repositoryValidateUser(authCode)
  }
}
