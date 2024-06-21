import { MemberUpdateValidatorType } from '@/validators/members.validator'

export async function updateMember(
  id: string,
  data: MemberUpdateValidatorType,
) {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
