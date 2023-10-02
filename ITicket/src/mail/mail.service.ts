import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customer/models/customer.model';

@Injectable()
export class MailService {
    constructor (private mailerService: MailerService) {}

    async sendCustomerConfirmation(customer: Customer) : Promise<void> {
        const url = `${process.env.API_HOST}/api/customer/activate/${customer.activation_link}`;
        await this.mailerService.sendMail({
            to: customer.email,
            subject: "Welcome to ITicket App! Confirm your Email",
            template: "./confirmation",
            context: {
                name: customer.first_name,
                url
            }
        })
    }
}
