import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { createMemberType } from '../../validators/member.validator'

const prismaService = new PrismaService()

export async function repositoryCreateMember(
  createMember: createMemberType,
): Promise<CallbackPromise> {
  const { userPhone, organizationDocument, role } = createMember
  try {
    const organization = await prismaService.organization.findFirst({
      where: { document: organizationDocument },
    })
    if (!organization)
      return {
        success: false,
        message: 'A organização não foi encontrada!',
        status: 403,
      }

    const user = await prismaService.user.findFirst({
      where: { phone: userPhone },
    })
    if (!user)
      await prismaService.user.create({
        data: { role: 'customer', phone: userPhone! },
      })

    const member = await prismaService.member.findMany({
      where: { userId: user?.id },
    })
    if (member) {
      member.map((member) => {
        if (member?.organizationId == organization?.id)
          return {
            success: false,
            message: `o membro ${userPhone} já faz parte da organização ${organization?.name}`,
            status: 401,
          }
      })
    }

    return await prismaService.member
      .create({
        data: {
          role: role,
          organization: {
            connect: {
              document: organizationDocument,
            },
          },
          user: {
            connect: {
              phone: userPhone,
            },
          },
        },
      })
      .then((data) => {
        return {
          success: true,
          response: data?.id,
          message: `${user?.name} agora faz parte da organização ${organization?.name} na plataforma`,
        }
      })
  } catch (error: any) {
    await prismaService.$disconnect()
    return {
      success: false,
      message: error?.message,
      status: error?.status,
    }
  } finally {
    await prismaService.$disconnect()
  }
}
