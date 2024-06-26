import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ContactFormDialogComponent} from "../../../../shared/dialogs/contact-form-dialog/contact-form-dialog.component";
import {Meta} from "@angular/platform-browser";
import {DoctorsBase} from "../../doctors.base";

@Component({
  selector: 'app-raba-galia',
  templateUrl: './raba-galia.component.html',
  styleUrls: ['./raba-galia.component.scss']
})
export class RabaGaliaComponent extends DoctorsBase {
  constructor(private dialog: MatDialog, private meta: Meta) {
    super();
    this.meta.addTag({ name: 'description', content: 'Раба Галина Іванівна. Лікар-косметолог.' });
  }

  openContactDialog() {
    this.dialog.open(ContactFormDialogComponent);
  }

  get experience(): number {
    return new Date().getFullYear() - 2008;
  }
}
