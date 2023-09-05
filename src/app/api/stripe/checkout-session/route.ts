import { stripe } from '@/libraries/stripe'
import {
  StripeCheckoutSchema,
  StripeCheckoutSchemaType,
} from '@/schemas/stripe'

export const POST = async (request: Request) => {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
  try {
    return await request
      .json()
      .then(async (inputs: StripeCheckoutSchemaType) => {
        if (await StripeCheckoutSchema.parseAsync(inputs)) {
          const { invoiceId, amount, service, description, userId, userEmail } =
            inputs
          const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: 'brl',
                  product_data: {
                    name: service,
                    description: description,
                  },
                  unit_amount: amount * 100,
                  recurring: {
                    interval: 'month',
                  },
                },
                quantity: 1,
              },
            ],
            metadata: {
              userId,
            },
            mode: 'subscription',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            customer_email: userEmail,
            success_url: `${NEXTAUTH_URL}/?success=true`,
            cancel_url: `${NEXTAUTH_URL}/?canceled=true`,
          })
          return new Response(JSON.stringify(session))
        }
      })
  } catch (error: any) {
    console.error('[STRIPE_CHECKOUT_ERROR]: ', error)
    return new Response(error?.message || error, { status: 400 })
  }
}
