import { stripe } from '@/libraries/stripe'
import { prisma } from '@/libraries/prisma'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  try {
    return new NextResponse(JSON.stringify(request.method))
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
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
    return new NextResponse(error?.message || error, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    if (!session?.metadata?.userId && !session?.metadata?.solutionId) {
      return new NextResponse('o usuario e a solução não foram definidos', {
        status: 400,
      })
    }

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    )

    await prisma.subscription.create({
      data: {
        userId: session?.metadata?.userId,
        solutionId: session?.metadata?.solutionId,
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        discount: Number(session?.metadata?.discount),
        tax: Number(session?.metadata?.tax),
        amount: Number(session?.metadata?.amount),
      },
    })
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    )

    await prisma.subscription.update({
      where: { stripeCustomerId: subscription.id },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        discount: Number(session?.metadata?.discount),
        tax: Number(session?.metadata?.tax),
        amount: Number(session?.metadata?.amount),
      },
    })
  }

  return new NextResponse(null, { status: 201 })
}
