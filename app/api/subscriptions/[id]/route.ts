import SubscriptionsService from '@/app/core/services/subscriptions.service'
import {
  removeSubscription,
  removeSubscriptionType,
  updateSubscription,
  updateSubscriptionType,
} from '@/app/core/validators/subscription.validator'

const subscriptionsService = new SubscriptionsService()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await subscriptionsService.findOne(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: updateSubscriptionType = await request.json()
  try {
    if (await updateSubscription.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await subscriptionsService.update(id, inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const inputs: removeSubscriptionType = await request.json()
  try {
    if (await removeSubscription.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await subscriptionsService.remove(id, inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
