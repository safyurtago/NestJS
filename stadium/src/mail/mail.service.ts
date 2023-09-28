import { User } from './../users/models/user.model';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admin/models/admin.model';

@Injectable()
export class MailService {
    constructor (private mailerService: MailerService) {}

    async sendUserConfirmation(user: User | Admin) : Promise<void> {
        let url: string;
        if (typeof user === typeof User) {
            url = `${process.env.API_HOST}/api/users/activate/${user.activation_link}`;
        }
        else {
            url = `${process.env.API_HOST}/api/admin/activate/${user.activation_link}`;
        }
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Welcome to Stadium App! Confirm your Email",
            template: "./confirmation",
            context: {
                name: user.username,
                url
            }
        })
    }
}
