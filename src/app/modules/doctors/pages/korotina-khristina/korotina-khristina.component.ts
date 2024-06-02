import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ContactFormDialogComponent} from "../../../../shared/dialogs/contact-form-dialog/contact-form-dialog.component";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-korotina-khristina',
  templateUrl: './korotina-khristina.component.html',
  styleUrls: ['./korotina-khristina.component.scss']
})
export class KorotinaKhristinaComponent {
  constructor(private dialog: MatDialog, private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'Коротіна Христина Вікторівна. Лікар-отоларинголог.' });
  }

  openContactDialog() {
    this.dialog.open(ContactFormDialogComponent);
  }

  get experience(): number {
    return new Date().getFullYear() - 2021;
  }
}
