import { prisma } from '@/libraries/prisma'
import { stripe } from '@/libraries/stripe'
import {
  SubscriptionCreateSchema,
  SubscriptionCreateSchemaType,
} from '@/types/subscriptions/schema'

export const POST = async (
  request: Request,
): Promise<SubscriptionCreateSchemaType | any> => {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: SubscriptionCreateSchemaType) => {
        if (await SubscriptionCreateSchema.parseAsync(inputs)) {
          const { userDocCode, solutionUrl, discount, tax, amount } = inputs

          const user = await prisma.user.findFirst({
            where: { docCode: userDocCode, softDeleted: false, isActive: true },
          })
          if (!user)
            return new Response('esta conta não pode contratar serviços', {
              status: 403,
            })

          const solution = await prisma.solution.findFirst({
            where: { url: solutionUrl },
          })
          if (!solution)
            return new Response(
              'a solução não está disponível para contratação',
              { status: 404 },
            )

          const totalAmount: number = Math.floor(amount! - discount! + tax!)

          const stripeSession = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            customer_email: user?.email!,
            success_url: `${NEXTAUTH_URL}`,
            cancel_url: `${NEXTAUTH_URL}`,
            line_items: [
              {
                price_data: {
                  currency: 'brl',
                  product_data: {
                    name: solution?.name!,
                    description: solution?.description!,
                  },
                  unit_amount: totalAmount * 100,
                  recurring: {
                    interval: 'month',
                  },
                },
                quantity: 1,
              },
            ],
            metadata: {}, //TODOS: definir metadata
          })
          return new Response(JSON.stringify(stripeSession))
        }
      })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
