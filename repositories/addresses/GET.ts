export async function findAllAddresses() {
  try {
    return 'all addresses'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findAddressById(id: string) {
  try {
    return 'address by ' + id
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findAddressByZipCode(zipCode: string) {
  try {
    return 'address by ' + zipCode
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
