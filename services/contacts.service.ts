import { ContactValidator } from '@/validators/contact.validator'

export class ContactsService {
  async contactFormAction(_: unknown, form: FormData) {
    const inputs = Object.fromEntries(form)

    const validator = ContactValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    console.log(inputs)
    return {}
  }
}
