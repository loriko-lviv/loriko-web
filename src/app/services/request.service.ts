import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  constructor(private httpClient: HttpClient) {
  }

  sendRequest(name: string, phone: string, wishes = '') {
    const chatId = environment.telegramChatId;
    const botId = environment.telegramBotId;
    const botToken = environment.telegramBotToken;
    return this.httpClient.post(` https://api.telegram.org/bot${botId}:${botToken}/sendMessage`, {
      chat_id: chatId,
      text: `Ви отримали нову заявку на сайті:

      Імʼя: ${name}

      Телефон: +380${phone}

      ${wishes ? `Побажання: ${wishes}` : ''}`
    });
  }
}
