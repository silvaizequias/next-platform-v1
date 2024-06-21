import AWSService from './aws.service'
import { SenderEmail, SenderSms } from '@/interfaces/sender.interface'
import { SendEmailCommand } from '@aws-sdk/client-ses'
import { environment } from '@/environments'
import { PublishCommand } from '@aws-sdk/client-sns'

export default class SendersService {
  private awsService = new AWSService()

  async sendEmail(senderEmail: SenderEmail) {
    const { to, bcc, subject, message } = senderEmail

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

    return await this.awsService.sesClient
      .send(sendEmailCommand)
      .then(() => {
        //console.log('succeeded')
      })
      .catch((error) => new Error(error?.message, error?.status))
  }

  async sendSMS(senderSms: SenderSms) {
    const { to, message } = senderSms

    const publishCommand = new PublishCommand({
      Message: message,
      PhoneNumber: '+' + to,
    })
    return await this.awsService.snsClient
      .send(publishCommand)
      .then(() => {
        //console.log('succeeded')
      })
      .catch((error) => new Error(error?.message, error?.status))
  }
}
