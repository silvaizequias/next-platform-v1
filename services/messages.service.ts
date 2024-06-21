import { ContactValidatorType } from '@/validators/contact.validator'

export default class MessagesService {
  contactFormMessage(data: ContactValidatorType) {
    return `
    <div>
    <p><i>${data.message}</i></p>
    <b>${data.name}</b>
    <br />${data.email}<br />${data.phone}
    </div>
    `
  }
}
