import {Component} from '@angular/core';
import {SectionTitleModule} from "../../section-title/section-title.module";
import {MatIconModule} from "@angular/material/icon";
import {NgxMaskDirective} from "ngx-mask";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {TextFieldModule} from "@angular/cdk/text-field";
import {RequestService} from "../../../services/request.service";
import {take} from "rxjs";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-contact-form-dialog',
  standalone: true,
  templateUrl: './contact-form-dialog.component.html',
  styleUrls: ['./contact-form-dialog.component.scss'],
  imports: [
    SectionTitleModule,
    MatIconModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    TextFieldModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
})
export class ContactFormDialogComponent {
  private durationInSeconds = 5;
  readonly form = this.fb.group({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    wishes: new FormControl(''),
  });

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private matDialogRef: MatDialogRef<ContactFormDialogComponent>,
              private requestService: RequestService) {
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
        this.matDialogRef.close();
      });
  }

  closeDialog(): void {
    this.matDialogRef.close();
  }

  private openSnackBar() {
    this.snackBar.open('Заявка була успішно відправлена', undefined, {
      duration: this.durationInSeconds * 1000,
      panelClass: 'snack-bar-success',
    });
  }
}
