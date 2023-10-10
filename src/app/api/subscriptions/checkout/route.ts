import { prisma } from '@/libraries/prisma'
import { stripe } from '@/libraries/stripe'
import {
  SubscriptionCreateSchema,
  SubscriptionCreateSchemaType,
} from '@/types/subscriptions/schema'
import { NextResponse } from 'next/server'

export const POST = async (
  request: Request,
): Promise<SubscriptionCreateSchemaType | any> => {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
  const inputs: SubscriptionCreateSchemaType = await request.json()
  try {
    if (await SubscriptionCreateSchema.parseAsync(inputs)) {
      const { userDocCode, solutionUrl } = inputs

      const user = await prisma.user.findFirst({
        where: { docCode: userDocCode, softDeleted: false, isActive: true },
      })
      if (!user)
        return new NextResponse('esta conta não pode contratar serviços', {
          status: 403,
        })

      const solution = await prisma.solution.findFirst({
        where: { url: solutionUrl },
      })
      if (!solution)
        return new NextResponse('a solução não está disponível para contratação', {
          status: 404,
        })

      const userId: string = user?.id!
      const solutionId: string = solution?.id!
      const discount: number = inputs?.discount!
      const tax: number = inputs?.tax!
      const amount: number = Math.floor(inputs?.amount! - discount! + tax!)

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
              unit_amount: amount * 100,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        metadata: { userId, solutionId, amount, discount, tax },
      })
      return new NextResponse(JSON.stringify(stripeSession), { status: 201 })
    }
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}
