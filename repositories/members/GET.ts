export async function findAllMembers() {
  try {
    return 'all members'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findMemberById(id: string) {
  try {
    return 'member by ' + id
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
