import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ContactFormDialogComponent} from "../../../../shared/dialogs/contact-form-dialog/contact-form-dialog.component";

@Component({
  selector: 'app-korotina-khristina',
  templateUrl: './korotina-khristina.component.html',
  styleUrls: ['./korotina-khristina.component.scss']
})
export class KorotinaKhristinaComponent {
  constructor(private dialog: MatDialog) {
  }

  openContactDialog() {
    this.dialog.open(ContactFormDialogComponent);
  }

  get experience(): number {
    return new Date().getFullYear() - 2021;
  }
}
