import { environment } from '@/environments'
import { AWSService } from './aws.service'
import { SendEmailCommand } from '@aws-sdk/client-ses'
import { SendEmail, SendSMS } from '../interfaces/sender.interface'
import { PublishCommand } from '@aws-sdk/client-sns'

export class SendersService {
  private awsService = new AWSService()

  async email(sendEmail: SendEmail) {
    const { to, bcc, subject, message } = sendEmail

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
      Source: environment.SENDING_EMAIL_FROM,
    })
    return await this.awsService.sesClient
      .send(sendEmailCommand)
      .then(() => {
        console.log('succeeded')
      })
      .catch((error) => new Error(error?.message, error?.status))
  }

  async sms(sendSMS: SendSMS) {
    const { to, message } = sendSMS

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
