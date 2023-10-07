import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
import { MailerService } from '@nestjs-modules/mailer';
import { Customer } from '../customer/models/customer.model';

const {env} = process;

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  sendAdminConfirmation = async (admin: Admin): Promise<void> => {
    const activation_url = `${env.API_HOST}/api/admin/activate/${admin.activation_link}`
    await this.mailService.sendMail({
      to: admin.email,
      subject: "Welcome to Safyur Term Payment Store! Please confirm your email",
      template: './confirmation',
      context: {
        name: admin.username,
        url: activation_url
      }
    })
  }

  sendCustomerConfirmation = async (customer: Customer): Promise<void> => {
    const activation_url = `${env.API_HOST}/api/customer/activate/${customer.activation_link}`
    await this.mailService.sendMail({
      to: customer.email,
      subject: "Welcome to Safyur Term Payment Store! Please confirm your email",
      template: './confirmation',
      context: {
        name: customer.username,
        url: activation_url
      }
    })
  }
}
