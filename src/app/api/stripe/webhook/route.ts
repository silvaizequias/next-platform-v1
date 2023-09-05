import { stripe } from '@/libraries/stripe'
import { NextApiRequest } from 'next'

export const GET = async (request: Request) => {
  try {
    return new Response(JSON.stringify(request.method))
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}

export const POST = async (request: NextApiRequest) => {
  const sig = request.headers['stripe-signature']!
  const buf = new Buffer(request.body)
  let event

  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!
  try {
    event = stripe.webhooks.constructEvent(buf, sig, STRIPE_WEBHOOK_SECRET)
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('PaymentIntent was successful!')
      break
    case 'payment_method.attached':
      const paymentMethod = event.data.object
      console.log('PaymentMethod was attached to a Customer!')
      break
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a response to acknowledge receipt of the event
  return new Response(JSON.stringify({ received: true }))
}
