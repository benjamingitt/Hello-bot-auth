import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Help,
  On,
  Message,
  Start,
  Update,
  Command,
  InjectBot,
  Ctx,
  Action,
} from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { UserService } from './user.service';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { TelegrafExceptionFilter } from 'src/common/filter/telegraf-exception.filter';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ContextMsg, Contexted } from 'src/common/interfaces/context.interface';
import { HelloComandPipe } from 'src/common/pipes/command.pipe';
import { actionButton } from 'src/buttons/app.button';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class UserUpdate {
  constructor(
    @InjectBot() private bot: Telegraf<Contexted>,
    private readonly userService: UserService,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: ContextMsg) {
    const name = await ctx.update.message.from.first_name;
    this.userService.addUser(ctx);
    await ctx.replyWithHTML(`Hello`, actionButton(name));
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me any text';
  }

  @Command('admin')
  @UseGuards(AdminGuard)
  onAdminCommand(): string {
    return 'Hello admin';
  }

  @Command('adminhello')
  @UseGuards(AdminGuard)
  async onAdminCommandHello(
    @Message('text', new HelloComandPipe()) text: string,
  ): Promise<any> {
    const words = text.match(/(\w+)/);
    const id = words[0];
    const findId = await this.userService.findById(id);
    if (!findId) return 'User not found in db';
    const message = text.replace(words[0], '');
    await this.bot.telegram.sendMessage(id, message);

    return 'Message send';
  }
  @Command('getid')
  @UseGuards(AdminGuard)
  async getIdCommand(): Promise<any> {
    const findId = await this.userService.findAllId();
    const id = findId.map((id) => id.id);
    return id;
  }
  @Action(['go'])
  async payMouth(ctx: ContextMsg) {}
  @On('text')
  onMessage(@Message('text') reversedText: string): string {
    return this.userService.echo(reversedText);
  }
}
