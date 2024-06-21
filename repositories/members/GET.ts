import { Member } from '@/interfaces/member.interface'

export async function findAllMembers(): Promise<Member[] | any> {
  try {
    return 'all members'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findMemberById(id: string): Promise<Member | any> {
  try {
    return 'member by ' + id
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
