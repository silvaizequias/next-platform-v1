import { sendContactFormType } from '../validators/contact.validator'

export class MessagesService {
  async platformContactForm(contact: sendContactFormType) {
    return `
    <div>
    <p><strong>${contact.subject}</strong></p>
    <p><i>${contact.message}</i></p>
    <b>${contact.name}</b>
    <br /><small>${contact.email}</small><br /><small>${contact.phone}</small>
    </div>
    `
  }

  async codeGenerated(code: string) {
    return `PLATAFORMA DEDICADO: utilize o código ${code} para autenticar.`
  }
}
