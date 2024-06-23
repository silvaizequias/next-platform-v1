import { ContactValidator } from './validator'

export class ContactActions {
  async contactForm(_: unknown, form: FormData) {
    const inputs = Object.fromEntries(form)

    const validator = ContactValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    console.log(inputs)
    return {}
  }
}
