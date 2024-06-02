import {Component} from '@angular/core';
import {ContactFormDialogComponent} from "../../shared/dialogs/contact-form-dialog/contact-form-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(private dialog: MatDialog) {
  }

  openContactDialog() {
    this.dialog.open(ContactFormDialogComponent);
  }
}
