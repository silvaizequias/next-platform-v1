import { stripe } from '@/libraries/stripe'
import { headers } from 'next/headers'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET ?? '',
  )

  const session = event.data.object as Stripe.Checkout.Session
  const metadata = session?.metadata

  if (!metadata)
    return new Response(JSON.stringify('unauthorized'), { status: 400 })

  switch (event.type) {
    case 'checkout.session.completed':
      await stripe.subscriptions
        .retrieve(session.subscription as string)
        .then((data) => console.log('completed: ', data))
        .catch((error) => console.log('completed_error: ', error))
      break

    case 'invoice.payment_succeeded':
      await stripe.subscriptions
        .retrieve(session.subscription as string)
        .then((data) => console.log('succeeded: ', data))
        .catch((error) => console.log('succeeded_error: ', error))
      break

    default:
      console.log(`unhandled event type ${event.type}`)
  }

  return new Response(JSON.stringify('webhook as running'), { status: 200 })
}
