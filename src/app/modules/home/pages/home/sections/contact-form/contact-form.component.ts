import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  private readonly durationInSeconds = 5;

  form = this.fb.group({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  })

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private fb: FormBuilder) {}

  sendRequest(): void {
    const chatId = environment.telegramChatId;
    const botId = environment.telegramBotId;
    const botToken = environment.telegramBotToken;
    this.httpClient.post(` https://api.telegram.org/bot${botId}:${botToken}/sendMessage`, {
      chat_id: chatId,
      text: `${this.form.get('name')?.value} залишив(-ла) заявку на сайті +380${this.form.get('phone')?.value}`
    }).subscribe(() => {
      this.form.reset();
      this.openSnackBar();
    })
  }

  private openSnackBar() {
    this._snackBar.open('Заявка була успішно відправлена', undefined, {
      duration: this.durationInSeconds * 1000,
      panelClass: 'snack-bar-success',
    });
  }
}
