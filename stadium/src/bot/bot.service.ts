import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from 'src/app.constants';
import { Context, Telegraf, Markup } from 'telegraf';
import { Bot } from './models/bot.model';


@Injectable()
export class BotService {
 constructor (
    @InjectModel(Bot) private botRepository: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
 ) {}

 async start(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botRepository.findOne({
        where: { user_id: userId},
    })
    if (!user) {
        await this.botRepository.create({
            user_id: userId,
            first_name: ctx.from.first_name,
            last_name: ctx.from.last_name,
            username: ctx.from.username
        })
        await ctx.reply('Please <b>Send Phone Number</b> tugmasini bosing', {
            parse_mode: "HTML",
            ...Markup.keyboard([
                [Markup.button.contactRequest('Send Phone Number')],
            ])
            .oneTime()
            .resize(),
        })
    } else if (!user.status) {
        await ctx.reply('Please <b>Send Phone Number</b> tugmasini bosing', {
            parse_mode: "HTML",
            ...Markup.keyboard([
                [Markup.button.contactRequest('Send Phone Number')],
            ])
            .oneTime()
            .resize(),
        })
    }
    else {
        await this.bot.telegram.sendChatAction(userId, 'typing');
        await ctx.reply('Connecttion has been set with this bot', {
            parse_mode: 'HTML',
            ...Markup.removeKeyboard(),
        })
    }
}

}
