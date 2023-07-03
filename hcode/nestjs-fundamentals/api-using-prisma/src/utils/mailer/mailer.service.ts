import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'myah82@ethereal.email',
        pass: 'QqKQhRYPJxY58ScUdU',
      }
    })
  }

  async sendEmail(mailOptions: nodemailer.SendMailOptions) {
    return this.transporter.sendMail(mailOptions)
  }
}