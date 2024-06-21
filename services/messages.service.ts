export interface Contact {
  name: string
  email: string
  phone: string
  message: string
}

export default class MessagesService {
  contactFormMessage(data: Contact) {
    return `
    <div>
    <p><i>${data.message}</i></p>
    <b>${data.name}</b>
    <br />${data.email}<br />${data.phone}
    </div>
    `
  }
}
