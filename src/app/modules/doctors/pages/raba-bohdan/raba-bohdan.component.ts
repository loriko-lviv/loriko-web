import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ContactFormDialogComponent} from "../../../../shared/dialogs/contact-form-dialog/contact-form-dialog.component";

@Component({
  selector: 'app-raba-bohdan',
  templateUrl: './raba-bohdan.component.html',
  styleUrls: ['./raba-bohdan.component.scss']
})
export class RabaBohdanComponent {

  constructor(private dialog: MatDialog) {
  }

  openContactDialog() {
    this.dialog.open(ContactFormDialogComponent, {
      panelClass: 'contact-form-dialog',
    });
  }

  get experience(): number {
    return new Date().getFullYear() - 2008;
  }
}
