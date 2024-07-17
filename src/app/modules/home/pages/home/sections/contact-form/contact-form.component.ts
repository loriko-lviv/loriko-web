import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {take} from "rxjs";
import {RequestService} from "../../../../../../services/request.service";

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
    wishes: new FormControl(''),
  })

  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder, private requestService: RequestService) {
  }

  sendRequest(): void {
    this.requestService.sendRequest(
      this.form.get('name')?.value as string,
      this.form.get('phone')?.value as string,
      this.form.get('wishes')?.value || '',
    ).pipe(take(1))
      .subscribe(() => {
        this.form.reset();
        this.openSnackBar();
      });
  }

  get phoneControlValue(): string {
    return this.form.get('phone')?.value as string;
  }

  private openSnackBar() {
    this._snackBar.open('Заявка була успішно відправлена', undefined, {
      duration: this.durationInSeconds * 1000,
      panelClass: 'snack-bar-success',
    });
  }
}
