import { MemberCreateValidatorType } from '@/components/members/validator'

export async function createMember(data: MemberCreateValidatorType) {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
