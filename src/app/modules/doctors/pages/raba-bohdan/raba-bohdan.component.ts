import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ContactFormDialogComponent} from "../../../../shared/dialogs/contact-form-dialog/contact-form-dialog.component";
import {Meta} from "@angular/platform-browser";
import {DoctorsBase} from "../../doctors.base";

@Component({
  selector: 'app-raba-bohdan',
  templateUrl: './raba-bohdan.component.html',
  styleUrls: ['./raba-bohdan.component.scss']
})
export class RabaBohdanComponent extends DoctorsBase {

  constructor(private dialog: MatDialog, private meta: Meta) {
    super();
    this.meta.addTag({ name: 'description', content: 'Раба Богдан Мирославович. Лікар-отоларинголог.' });
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
