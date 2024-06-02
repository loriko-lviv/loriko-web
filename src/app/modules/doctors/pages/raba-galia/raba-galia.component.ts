import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ContactFormDialogComponent} from "../../../../shared/dialogs/contact-form-dialog/contact-form-dialog.component";

@Component({
  selector: 'app-raba-galia',
  templateUrl: './raba-galia.component.html',
  styleUrls: ['./raba-galia.component.scss']
})
export class RabaGaliaComponent {
  constructor(private dialog: MatDialog) {
  }

  openContactDialog() {
    this.dialog.open(ContactFormDialogComponent);
  }

  get experience(): number {
    return new Date().getFullYear() - 2008;
  }
}
