import Stripe from 'stripe'
import { loadStripe, Stripe as StripeJs } from '@stripe/stripe-js'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string
const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

export const stripe = new Stripe(STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
  typescript: true,
})

let stripePromise: Promise<StripeJs | null>

export const getStipePromise = () => {
  if (!stripePromise && !!NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}
