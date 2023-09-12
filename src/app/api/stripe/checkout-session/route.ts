import { prisma } from '@/libraries/prisma'
import { stripe } from '@/libraries/stripe'
import {
  StripeCheckoutSchema,
  StripeCheckoutSchemaType,
} from '@/schemas/stripe'

export const POST = async (request: Request) => {
  //TODO: criar função de caminho absoluto
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  try {
    await prisma?.$connect()
    return await request
      .json()
      .then(async (inputs: StripeCheckoutSchemaType) => {
        if (await StripeCheckoutSchema.parseAsync(inputs)) {
          const {
            serviceId,
            serviceName,
            serviceDescription,
            serviceAmount,
            userId,
            userEmail,
          } = inputs

          const subscription = await prisma?.subscription.findFirst({
            where: { userId: userId, serviceId: serviceId },
          })
          if (subscription && subscription?.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
              customer: subscription?.stripeCustomerId,
              return_url: NEXTAUTH_URL,
            })

            return new Response(JSON.stringify({ url: stripeSession?.url }))
          }

          const stripeSession = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            customer_email: userEmail,
            success_url: `${NEXTAUTH_URL}/`, //TODOS: criar rota de configurações do usuário
            cancel_url: `${NEXTAUTH_URL}/`,
            line_items: [
              {
                price_data: {
                  currency: 'brl',
                  product_data: {
                    name: serviceName,
                    description: serviceDescription,
                  },
                  unit_amount: serviceAmount * 100, //TODO: criar função de cálculo para preço de acordo com ointervalo
                  recurring: {
                    interval: 'month',
                  },
                },
                quantity: 1,
              },
            ],
            metadata: {
              userId,
              serviceId,
            },
          })
          return new Response(JSON.stringify(stripeSession))
        }
      })
  } catch (error: any) {
    console.error('[STRIPE_CHECKOUT_ERROR]: ', error)
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma?.$disconnect()
  }
}
