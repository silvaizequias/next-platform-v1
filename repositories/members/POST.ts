import { MemberCreateValidatorType } from '@/validators/members.validator'

export async function createMember(
  data: MemberCreateValidatorType,
): Promise<any> {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
