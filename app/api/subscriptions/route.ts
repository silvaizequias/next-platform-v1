import SubscriptionsService from '@/app/core/services/subscriptions.service'
import {
  createSubscription,
  createSubscriptionType,
} from '@/app/core/validators/subscription.validator'

const subscriptionsService = new SubscriptionsService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await subscriptionsService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function POST(request: Request) {
  const inputs: createSubscriptionType = await request.json()
  try {
    if (await createSubscription.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await subscriptionsService.create(inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
