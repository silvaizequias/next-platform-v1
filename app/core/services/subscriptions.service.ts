import { repositoryCreateSubscription } from '../repositories/subscriptions/create'
import {
  repositoryFindAllSubscriptions,
  repositoryFindOneSubscription,
} from '../repositories/subscriptions/find'
import { repositoryRemoveSubscription } from '../repositories/subscriptions/remove'
import { repositoryUpdateSubscription } from '../repositories/subscriptions/update'
import { CallbackPromise } from '../types/promise.type'
import {
  createSubscriptionType,
  removeSubscriptionType,
  updateSubscriptionType,
} from '../validators/subscription.validator'

export default class SubscriptionsService {
  async create(
    createSubscriptions: createSubscriptionType,
  ): Promise<CallbackPromise> {
    return await repositoryCreateSubscription(createSubscriptions)
  }

  async findAll(): Promise<CallbackPromise> {
    return await repositoryFindAllSubscriptions()
  }

  async findOne(id: string): Promise<CallbackPromise> {
    return await repositoryFindOneSubscription(id)
  }

  async update(
    id: string,
    updateSubscription: updateSubscriptionType,
  ): Promise<CallbackPromise> {
    return await repositoryUpdateSubscription(id, updateSubscription)
  }

  async remove(
    id: string,
    removeSubscription: removeSubscriptionType,
  ): Promise<CallbackPromise> {
    return await repositoryRemoveSubscription(id, removeSubscription)
  }
}
