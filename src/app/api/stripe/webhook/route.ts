import { stripe } from '@/libraries/stripe'
import { prismaDedicated } from '@/libraries/prisma'
import { headers } from 'next/headers'
import Stripe from 'stripe'

export const GET = async (request: Request) => {
  try {
    return new Response(JSON.stringify(request.method))
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}

export const POST = async (request: Request) => {
  const body = await request.text()
  const signature = headers().get('Stripe-Signature') as string
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET,
    )
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    )

    if (!session?.metadata?.userId && !session?.metadata?.serviceId) {
      return new Response('the userid and service id are required', {
        status: 400,
      })
    }

    await prismaDedicated.subscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        serviceId: session?.metadata?.serviceId,
        status: 'ACTIVE',
        recurringInterval: 'MONTH',
      },
    })
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    )

    await prismaDedicated.subscription.update({
      where: { stripeCustomerId: subscription.id },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    })
  }

  return new Response(null, { status: 200 })
}
