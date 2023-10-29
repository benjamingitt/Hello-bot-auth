import { Scenes, Context } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Contexted extends Scenes.SceneContext {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContextMsg
  extends Context<Update.MessageUpdate<Message.TextMessage>> {}
