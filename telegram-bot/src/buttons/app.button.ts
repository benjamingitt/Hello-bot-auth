import { Markup } from 'telegraf';

export function actionButton(name: string) {
  console.log('name', name);
  return Markup.inlineKeyboard(
    [
      Markup.button.login(
        'Go to website',
        `https://rnd.cryptan.uno/?name=${name}`,
      ),
    ],

    { columns: 1 },
  );
}
