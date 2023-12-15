import { prisma } from '@/libraries/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { UpdateSubdomainDTO, UpdateSubdomainDTOType } from '../dto'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const session = await getServerSession(authOptions)
  try {
    if (session)
      return new Response(
        JSON.stringify(
          await prisma.subdomain.findFirst({
            where: { id: id, softDeleted: false },
          }),
        ),
      )

    return new Response(JSON.stringify('acesso não autorizado'), {
      status: 403,
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    const session = await getServerSession(authOptions)
    if (session && session?.user.profile == 'MASTER') {
      const inputs: UpdateSubdomainDTOType = await request.json()
      if (await UpdateSubdomainDTO.parseAsync(inputs)) {
        await prisma.subdomain.update({
          where: { id: id },
          data: { ...inputs },
        })

        return new Response(
          JSON.stringify('as informações do subdomínio foram atualizadas'),
          { status: 201 },
        )
      }
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
