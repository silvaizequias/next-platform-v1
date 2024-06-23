import { SendEmailCommand } from '@aws-sdk/client-ses'
import { environment } from '@/environments'
import { PublishCommand } from '@aws-sdk/client-sns'
import AWS from '@/aws'

interface SendEmail {
  to: string
  bcc?: string
  subject: string
  message: string
}

interface SendSMS {
  to: string
  message: string
}

export default class Senders {
  private aws = new AWS()

  async sendEmail(data: SendEmail): Promise<any> {
    const { to, bcc, subject, message } = data

    const sendingEmailFrom = environment.sendingEmailFrom

    const sendEmailCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: [to],
        BccAddresses: [bcc ?? ''],
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message,
          },
          Text: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
      },
      Source: sendingEmailFrom,
    })

    return await this.aws.sesClient
      .send(sendEmailCommand)
      .then(() => {
        //console.log('succeeded')
      })
      .catch((error) => new Error(error?.message, error?.status))
  }

  async sendSMS(senderSms: SendSMS): Promise<any> {
    const { to, message } = senderSms

    const publishCommand = new PublishCommand({
      Message: message,
      PhoneNumber: '+' + to,
    })
    return await this.aws.snsClient
      .send(publishCommand)
      .then(() => {
        //console.log('succeeded')
      })
      .catch((error) => new Error(error?.message, error?.status))
  }
}
