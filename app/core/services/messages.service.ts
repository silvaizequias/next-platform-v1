import { sendContactFormType } from '../validators/contact.validator'

export class MessagesService {
  async platformContactForm(contact: sendContactFormType) {
    return `
    <div>
    <p><strong>${contact.subject}</strong></p>
    <p><i>${contact.message}</i></p>
    <b>${contact.name}</b>
    <br />${contact.email}<br />${contact.phone}
    </div>
    `
  }
}
